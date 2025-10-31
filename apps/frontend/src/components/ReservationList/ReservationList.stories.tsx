import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Reservations/ReservationList',
  component: () => <div>ReservationList placeholder</div>,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithData: Story = {
  args: {
    reservations: [
      { id: 1, guest: 'Juan Pérez', date: '2025-11-01', room: 101 },
      { id: 2, guest: 'Lucía Gómez', date: '2025-11-05', room: 203 },
    ],
  },
};
