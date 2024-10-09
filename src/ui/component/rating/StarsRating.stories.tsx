import type { Meta, StoryObj } from "@storybook/react";
import StarsRating from "./StarsRating";

const meta: Meta<typeof StarsRating> = {
  title: "Atoms/StarsRating",
  component: StarsRating,
  argTypes: {
    rating: { control: { type: "number", min: 0, max: 5, step: 1 } },
  },
};

export default meta;

type Story = StoryObj<typeof StarsRating>;

export const Default: Story = {
  args: {
    rating: 4,
  },
};

export const FullStars: Story = {
  args: {
    rating: 5,
  },
};

export const NoStars: Story = {
  args: {
    rating: 0,
  },
};
