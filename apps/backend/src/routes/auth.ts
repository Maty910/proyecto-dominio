import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { InMemoryUserRepository } from '@hotel/domain/src/services/InMemoryUserRepository'
import { RegisterUserUseCase } from '@hotel/domain/src/use-cases/register-user.use-case'
import { AuthenticateUserUseCase } from '@hotel/domain/src/use-cases/authenticate-user.use-case'

const router = Router()
const userRepo = new InMemoryUserRepository()
const registerUser = new RegisterUserUseCase(userRepo)
const authUser = new AuthenticateUserUseCase(userRepo)

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret"
const JWT_EXPIRES = "4h"

router.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body
    if (!email || !password) return res.status(400).json({ message: "Missing fields" })

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await registerUser.execute(email, passwordHash, role ?? "customer")
    return res.status(201).json({ id: user.id, email: user.email, role: user.role })
  } catch (err: any) {
    if (err.name === "UserAlreadyExistsError") return res.status(409).json({ message: err.message }) 
    console.error(err)
    return res.status(500).json({ message: "Internal server error" })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email ||  !password) return res.status(400).json({ message: "Missing fields" })
    
    const user = await userRepo.findByEmail(email)
    if (!user) return res.status(401).json({ message: "Invalid credentials" })

    const token = jwt.sign({ sub: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES })
    return res.json({ token })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Internal server error" })
  }
})

export default router