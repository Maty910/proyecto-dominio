import type { Meta, StoryObj } from '@storybook/react'
import { TestButton } from './TestButton'

const meta: Meta<typeof TestButton> = {
  title: 'Demo/TestButton',
  component: TestButton,
}

export default meta;
type Story = StoryObj<typeof TestButton>;

export const Default: Story = { args: { label: 'Reservar' } };
