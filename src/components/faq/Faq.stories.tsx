import type { Meta, StoryObj } from "@storybook/react";
import Faq from "./Faq";

const meta: Meta<typeof Faq> = {
  title: "Molecules/Faq",
  component: Faq,
};

export default meta;

type Story = StoryObj<typeof Faq>;

export const Default: Story = {};
