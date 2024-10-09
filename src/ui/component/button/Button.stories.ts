import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  argTypes: {
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    text: "Primary Button",
    width: "medium",
    ariaLabel: "Primary Button",
  },
};

export const Small: Story = {
  args: {
    text: "Small Button",
    width: "small",
    ariaLabel: "Small Button",
  },
};

export const Large: Story = {
  args: {
    text: "Large Button",
    width: "large",
    ariaLabel: "Large Button",
  },
};

export const Disabled: Story = {
  args: {
    text: "Disabled Button",
    width: "medium",
    ariaLabel: "Disabled Button",
    disabled: true,
  },
};
