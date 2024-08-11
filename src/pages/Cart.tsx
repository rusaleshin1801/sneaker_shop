import React from "react";
import Header from "../components/header/Header";
import Cart from "../components/cart/Cart";
import Footer from "../components/footer/Footer";

const CartPage: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <Cart />
      <Footer />
    </React.Fragment>
  );
};

export default CartPage;
