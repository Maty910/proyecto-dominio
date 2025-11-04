import type { Meta, StoryObj } from '@storybook/react'
import RoomsPage from '../Pages/RoomsPage'

const meta: Meta<typeof RoomsPage> = {
  title: 'Pages/RoomsPage',
  component: RoomsPage,
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta
type Story = StoryObj<typeof RoomsPage>

export const Default: Story = {}

export const FilteredByType: Story = {
  render: () => {
    localStorage.setItem('storybook-filters', JSON.stringify({ type: "suite", price: "" }))
    return <RoomsPage />
  }
}

export const FilteredByPrice: Story = {
  render: () => {
    localStorage.setItem("storybook-filters", JSON.stringify({ type: "", price: "200-250" }))
    return <RoomsPage />
  }
}