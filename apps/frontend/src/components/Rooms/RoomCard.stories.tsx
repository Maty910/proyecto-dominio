import type { Meta, StoryObj } from "@storybook/react"
import RoomCard  from './RoomCard'

const meta: Meta<typeof RoomCard> = {
  title: "Components/RoomCard",
  component: RoomCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"]
}

export default meta

type Story = StoryObj<typeof RoomCard>

export const Default: Story = {
  args: {
    title: "Deluxe Suite",
    description: "Spacious room with sea view and private balcony.",
    price: "$120",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  }
}

export const LuxuryRoom: Story = {
  args: {
    title: "Luxury Ocean Room",
    description: "King-size bed, ocean view, minibar, and smart TV.",
    price: "$180",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974"
  }
}

export const CozySingle: Story = {
  args: {
    title: "Cozy Single Room",
    description: "Perfect for solo travelers. Compact yet comfortable.",
    price: "$80",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"
  }
} 