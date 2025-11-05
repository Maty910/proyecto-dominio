const API_URL = "http://localhost:3000"

export async function fetchRooms() {
  const res = await fetch(`${API_URL}/rooms`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
    }
  })

  if (!res.ok) throw new Error("Error fetching reservations")
  
  return res.json()
}

export async function fetchReservationsByRoom(roomId: string) {
  const res = await fetch(`${API_URL}/reservations/${roomId}`)
  
  if (!res.ok) throw new Error("Error fetching reservations for room")

  return res.json()
}

export async function createReservation(data: {
  id: string
  roomId: string
  checkInDate: string
  checkOutDate: string
  status: string
}) {
  const res = await fetch(`${API_URL}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
    },
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Error creating reservation")
  }

  return res.json()
}

export async function getReservations() {
  const token = localStorage.getItem("token")
  const res = await fetch(`${API_URL}/reservations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) throw new Error("Failed to fetch reservations")
  return res.json()
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) throw new Error("Invalid credentials")
  const data = await res.json()
  localStorage.setItem("token", data.token)

  return data
}

export const register = async (email: string, password: string, role: string) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
  })

  if (!response.ok) {
    throw new Error('Error registering user');
  }

  return response.json();
}

export const fetchReservations = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/reservations`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error fetching reservations');
  }

  return response.json();
}

export const deleteReservation = async (id: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/reservations/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error deleting reservation');
  }
}