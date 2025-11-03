import type { Meta, StoryObj } from "@storybook/react";
import HomePage from "./HomePage";
import Navbar from "../components/Navbar/Navbar";

const meta: Meta<typeof HomePage> = {
  title: "Pages/HomePage",
  component: HomePage,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof HomePage>;

export const Default: Story = {
  render: () => (
    <>
      <Navbar />
      <HomePage />
    </>
  ),
};
