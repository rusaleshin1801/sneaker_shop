export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  warrantyInformation: string;
  shippingInformation: string;
  thumbnail: string;
  images: string[];
  quantity: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}

export interface Cart {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface CartResponse {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}

export interface Quantity {
  id: number;
  quantity: number;
  totalPrice: number;
  discountedPrice: number;
}

export interface QuantitiesState {
  quantities: Quantity[];
}

export interface CartData {
  products: Product[];
}

export interface CartState {
  products: Product[];
}

export interface CartDataState {
  products: Product[];
  totalProducts: number;
  total: number;
  discountedTotal: number;
}

export interface CartState {
  cart: CartDataState | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
}
