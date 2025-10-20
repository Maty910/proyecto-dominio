import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '../../services/InMemoryUserRepository'
import { RegisterUserUseCase, UserAlreadyExistsError } from '../register-user.use-case'
import bcrypt from 'bcryptjs'

describe("ResgusterUserUseCase", () => {
  let repo: InMemoryUserRepository
  let useCase: RegisterUserUseCase

  beforeEach(() => {
    repo = new InMemoryUserRepository()
    useCase = new RegisterUserUseCase(repo)
  })

  it("Should register user and store hashed password", async () => {
    const raw = "s3cret"
    const hash = await bcrypt.hash(raw, 10)
    const user = await useCase.execute("a@b.com", hash, "customer")

    expect(user.email).toBe("a@b.com")
    expect(user.passwordHash).toBe(hash)
    const stored = await repo.findByEmail("a@b.com")
    expect(stored).not.toBeNull()
  })

  it("Should throw if email already exists", async () => {
    const raw = "s3cret"
    const hash = await bcrypt.hash(raw, 10)
    await useCase.execute("a@b.com", hash)
    await expect(useCase.execute("a@b.com", hash)).rejects.toThrow(UserAlreadyExistsError)
  })
})