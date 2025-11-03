import type { Meta, StoryObj } from '@storybook/react'
import Sidebar from './Sidebar'

const meta: Meta<typeof Sidebar> = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Open: Story = {
  args: {
    open: true,
    onClose: () => {},
  },
}
