import type { Meta, StoryObj } from "@storybook/react"
import FilterBar from "./FilterBar"

const meta: Meta<typeof FilterBar> = {
  title: "Rooms/FilterBar",
  component: FilterBar,
  parameters: {
    layout: "centered"
  }
}

export default meta
type Story = StoryObj<typeof FilterBar>

export const Default: Story = {
  args: {}
}

export const WithInteraction: Story = {
  render: () => (
    <FilterBar onFilterChange={(f) => console.log("Filters changed:", f)} />
  )
}
