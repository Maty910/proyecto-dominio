import type { Meta, StoryObj } from '@storybook/react'
import RoomsGrid from './RoomsGrid'

const meta: Meta<typeof RoomsGrid> = {
  title: 'Rooms/RoomsGrid',
  component: RoomsGrid,
  parameters: { layout: 'centered' }
}

export default meta

type Story = StoryObj<typeof RoomsGrid>

export const Deafult: Story = {
  args: {
    rooms: [
      {
        id: "1",
        title: "Deluxe Suite",
        price: "$180",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        description: "Spacious suite with modern decor and balcony view.",
        type: "suite",
        status: "available",
      },
      {
        id: "2",
        title: "Standard Room",
        price: "$120",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
        description: "Cozy room perfect for couples or solo travelers.",
        type: "standard",
        status: "available",
      },
      {
        id: "3",
        title: "Family Room",
        price: "$210",
        image: "https://images.unsplash.com/photo-1560448205-17d3a46c84de?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        description: "Ideal for families, with extra beds and space.",
        type: "family",
        status: "available",
      }
    ],
  }
}