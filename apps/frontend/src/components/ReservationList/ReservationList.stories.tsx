import type { Meta, StoryObj } from '@storybook/react'
import ReservationList from './ReservationList'

const meta: Meta<typeof ReservationList> = { title: 'Reservations/ReservationList', component: ReservationList }
export default meta
type Story = StoryObj<typeof ReservationList>

export const Default: Story = { args: { reservations: [] } }
export const WithData: Story = { args: { reservations: [{ id:"1", roomId:"101", checkInDate: new Date().toISOString(), checkOutDate: new Date(Date.now()+86400000).toISOString(), status:"confirmed"}] } }
