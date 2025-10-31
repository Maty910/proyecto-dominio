import type { Meta, StoryObj } from '@storybook/react';
import AuthForm from './AuthForm'

const meta: Meta<typeof AuthForm> = {
  title: 'Auth/AuthForm',
  component: AuthForm,
  parameters: { 
    layout: 'centered'
  }
}

export default meta;
type Story = StoryObj<typeof AuthForm>;

export const Default: Story = {
  args: {
    mode: 'login',
    loading: false,
    error: ''
  }
}

export const Loading: Story = {
  args: {
    mode: 'login',
    loading: true,
    error: ''
  }
}

export const WithError: Story = {
  args: {
    mode: 'login',
    error: 'Invalid credentials',
    loading: false
  }
}

export const RegisterMode: Story = {
  args: {
    mode: 'register',
    loading: false,
    error: ''
  }
}