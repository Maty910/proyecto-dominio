import { User } from '../entities/User'
import { UserRepository } from './UserRepository'

export class InMemoryUserRepository implements UserRepository {
  private items: User[] = []

  async save(user: User): Promise<void> {
    const idx = this.items.findIndex(u => u.id === user.id)
    if (idx >= 0) this.items[idx] = user
    else this.items.push(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.items.find(u => u.email === email) ?? null
  }

  async findById(id: string): Promise<User | null> {
    return this.items.find(u => u.id === id) ?? null
  }

  clear() {
    this.items = []
  }
}