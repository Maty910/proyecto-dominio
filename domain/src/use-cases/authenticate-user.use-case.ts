import { User } from "../entities/User"
import { UserRepository } from "../services/UserRepository"

export class AuthenticationError extends Error { 
  constructor(message = "Invalid credentials") {
    super(message = "Invalid credentials")
    this.name = "AuthenticationError"
  }
}

export class AuthenticateUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(email: string, passwordHash: string): Promise<User> {
    const user = await this.userRepo.findByEmail(email)
    if (!user) throw new AuthenticationError()
    if (user.passwordHash !== passwordHash) throw new AuthenticationError()
    return user
  }
}