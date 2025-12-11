import type { Room, Reservation, LoginResponse } from "../types/types"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

// Helper para headers con token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token")
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : ""
  }
}

export async function fetchRooms(): Promise<Room[]> {
  const res = await fetch(`${API_URL}/rooms`, {
    headers: { "Content-Type": "application/json" } // Habitaciones suelen ser públicas
  })
  if (!res.ok) throw new Error("Error al cargar habitaciones")
  return res.json()
}

export async function fetchReservationsByRoom(roomId: string): Promise<Reservation[]> {
  const res = await fetch(`${API_URL}/reservations/${roomId}`)
  if (!res.ok) throw new Error("Error al cargar reservas de la habitación")
  return res.json()
}

export async function createReservation(data: {
  id: string
  roomId: string
  checkInDate: string
  checkOutDate: string
  status: string
}): Promise<Reservation> {
  const res = await fetch(`${API_URL}/reservations`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || "Error al crear la reserva")
  }
  return res.json()
}

// Unificamos fetchReservations y getReservations
export async function fetchReservations(): Promise<Reservation[]> {
  const res = await fetch(`${API_URL}/reservations`, {
    headers: getAuthHeaders(),
  })
  if (!res.ok) throw new Error("No se pudieron cargar tus reservas")
  return res.json()
}

export async function deleteReservation(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/reservations/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })
  if (!res.ok) throw new Error("Error al cancelar la reserva")
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) throw new Error("Credenciales inválidas")
  const data = await res.json()
  localStorage.setItem("token", data.token)
  return data
}

// Corregido para coincidir con RegisterPage (email, pass, role, name, surname)
export const register = async (email: string, password: string, role: string, name?: string, surname?: string) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, surname, email, password, role }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.message || 'Error al registrar usuario');
  }
  return response.json();
}