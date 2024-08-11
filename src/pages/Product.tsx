import React from "react";
import Header from "../components/header/Header";
import Item from "../components/item/Item";
import Footer from "../components/footer/Footer";

const ProductPage: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <Item />
      <Footer />
    </React.Fragment>
  );
};

export default ProductPage;
