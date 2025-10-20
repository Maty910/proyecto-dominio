import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '../../services/InMemoryUserRepository'
import { RegisterUserUseCase } from '../register-user.use-case'
import { AuthenticateUserUseCase, AuthenticationError } from '../authenticate-user.use-case'
import bcrypt from 'bcryptjs'

describe("AuthenticateUserUseCase", () => {
  let repo: InMemoryUserRepository
  let register: RegisterUserUseCase
  let auth: AuthenticateUserUseCase

  beforeEach(() => {
    repo = new InMemoryUserRepository()
    register = new RegisterUserUseCase(repo)
    auth = new AuthenticateUserUseCase(repo)
  })

  it("Should authenticate with correct passwordHash", async () => {
    const raw = "pass123"
    const hash = await bcrypt.hash(raw, 10)
    await register.execute("u@example.com", hash)
    const user = await auth.execute("u@example.com", hash)
    expect(user.email).toBe("u@example.com")
  })

  it("Should reject with invalid credentials", async () => {
    const raw = "pass123"
    const hash = await bcrypt.hash(raw, 10)
    await register.execute("u@example.com", hash)
    const wrongHash = await bcrypt.hash("other", 10)
    await expect(auth.execute("u@example.com", wrongHash)).rejects.toThrow(AuthenticationError)
  })
})