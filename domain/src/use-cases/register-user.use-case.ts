import { User } from '../entities/User'
import { UserRepository } from '../services/UserRepository'
import { v4 as uuidv4 } from 'uuid'

export interface RegisterUserRequest {
  email: string
  passwordHash: string
  role?: "customer" | "admin"
}

export class UserAlreadyExistsError extends Error {
  constructor(message = "User already exists") {
    super(message)
    this.name = "UserAlreadyExistsError"
  }
}

export class RegisterUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(email: string, passwordHash: string, role: "customer" | "admin" = "customer"): Promise<User> {
    const existing = await this.userRepo.findByEmail(email)
    if (existing) throw new UserAlreadyExistsError()

    const user = new User({
      id: uuidv4(),
      email,
      passwordHash,
      role
    })

    await this.userRepo.save(user)
    return user
  }
}