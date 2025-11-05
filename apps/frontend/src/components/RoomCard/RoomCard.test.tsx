import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import RoomCard from './RoomCard'

describe('RoomCard', () => {
  it('renders room information correctly', () => {
    render(
      <RoomCard
        id="1"
        title="Room 101"
        description="Single"
        price="$100"
      />
    )

    expect(screen.getByText('Room 101')).toBeInTheDocument()
    expect(screen.getByText('Single')).toBeInTheDocument()
    expect(screen.getByText(/100/)).toBeInTheDocument()
  })

  it('shows available status', () => {
    render(
      <RoomCard
        id="1"
        title="Room 101"
        description="Single"
        price="$100"
        status="confirmed"
      />
    )

    expect(screen.getByText(/CONFIRMED/i)).toBeInTheDocument()
  })

  it('renders price with night text', () => {
    render(
      <RoomCard
        id="1"
        title="Room 101"
        description="Single"
        price="$100"
      />
    )

    expect(screen.getByText('$100 / night')).toBeInTheDocument()
  })

  it('renders check-in and check-out dates when provided', () => {
    render(
      <RoomCard
        id="1"
        title="Room 101"
        description="Single"
        price="$100"
        checkInDate="2025-01-15"
        checkOutDate="2025-01-20"
      />
    )

    expect(screen.getByText(/14\/1\/2025/)).toBeInTheDocument()
    expect(screen.getByText(/19\/1\/2025/)).toBeInTheDocument()
  })

  it('renders image when provided', () => {
    render(
      <RoomCard
        id="1"
        title="Room 101"
        description="Single"
        price="$100"
        image="/room.jpg"
      />
    )

    const image = screen.getByAltText('Room 101')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/room.jpg')
  })

  it('applies correct status color classes', () => {
    const { rerender } = render(
      <RoomCard
        id="1"
        title="Room 101"
        description="Single"
        status="confirmed"
      />
    )

    expect(screen.getByText('CONFIRMED')).toHaveClass('text-green-600')

    rerender(
      <RoomCard
        id="2"
        title="Room 102"
        description="Double"
        status="pending"
      />
    )

    expect(screen.getByText('PENDING')).toHaveClass('text-yellow-600')
  })
})