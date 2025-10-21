import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret"

export type AuthRequest = Request & { user?: { id: string; role: string; email: string } }

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  if (!header) return res.status(401).json({ message: "Missing authorization header" })
  const parts = header.split(" ")
  if (parts.length !== 2) return res.status(401).json({ message: "Invalid authorization header"})
  const token = parts[1]
  try {
    const payload = jwt.verify(token, JWT_SECRET) as any
    req.user = { id: payload.sub, role: payload.role, email: payload.email }
    return next()
  } catch (e) {
    return res.status(401).json({ message: "Invalid Token" })
  }
}

export function requiereRole(role: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" })
    if (req.user.role !== role) return res.status(403).json({ message: "Forbidden" })
    return next()
  }
}