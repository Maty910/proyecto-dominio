export interface Room {
  id: string
  title: string
  description: string
  price: string
  image: string // URL de la imagen
  status: 'available' | 'maintenance' | 'occupied'
  checkInDate?: string
  checkOutDate?: string
  type?: string
}

export interface Reservation {
  id: string
  roomId: string
  userId: string
  checkInDate: string
  checkOutDate: string
  status: 'confirmed' | 'cancelled' | 'pending'
  room?: Room // Para cuando hacés join o traés la info de la habitación
}

export interface User {
  id: string
  email: string
  name: string
  surname: string
  role: 'user' | 'admin'
}

export interface LoginResponse {
  token: string
  user?: User
}