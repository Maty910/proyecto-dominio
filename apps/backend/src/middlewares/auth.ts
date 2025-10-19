import jwt from 'jsonwebtoken'

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization
  if (!header) return res.status(401).json({ message: "No token" })
  const token = header.split(" ")[1]
  try {
    const payload = jwt.verify(token, proccess.env.JWT_SECRET || "dev") as any
    req.user = { id: payload.sub, role: payload.role }
    return next()
  } catch (e) {
    return res.status(401).json({ message: "Invalid Token" })
  }
}