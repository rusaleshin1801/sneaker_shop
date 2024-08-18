import type { Meta, StoryObj } from "@storybook/react";
import AddedControl from "./AddControl";
import { CartProduct } from "../../../types/types";

const sampleProduct: CartProduct = {
  id: 1,
  title: "Sample Product",
  price: 49.99,
  quantity: 3,
  total: 149.97,
  discountPercentage: 10,
  discountedTotal: 134.97,
  thumbnail: "https://via.placeholder.com/150",
};

const meta: Meta<typeof AddedControl> = {
  title: "Molecules/AddedControl",
  component: AddedControl,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AddedControl>;

export const Default: Story = {
  args: {
    product: sampleProduct,
  },
};
