import type { Meta, StoryObj } from '@storybook/react'
import { CallToAction } from './CallToAction'

const meta: Meta<typeof CallToAction> = {
  title: "Pages/Home/CallToAction",
  component: CallToAction,
  parameters: { layout: "centered" }
}

export default meta

type Story = StoryObj<typeof CallToAction>

export const Default: Story = {
  render: () => <CallToAction />
}