import type { Meta, StoryObj } from '@storybook/react'
import { Features } from './Features'

const meta: Meta<typeof Features> = {
  title: "Pages/Home/Features",
  component: Features,
  parameters: { layout: "centered" }
}

export default meta

type Story = StoryObj<typeof Features>

export const Deafult: Story = {
  render: () => <Features />
}