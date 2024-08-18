import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header/Header";
import Item from "../components/item/Item";
import Footer from "../components/footer/Footer";
import { useGetProductByIdQuery } from "../store/slices/getProductApi";
import NotFound from "../pages/NotFound";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: product,
    error,
    isLoading,
  } = useGetProductByIdQuery(Number(id));

  if (isLoading)
    return (
      <article className="loading-container">
        <p className="loading">Loading...</p>
      </article>
    );
  if (error)
    return (
      <article className="error-container">
        <p className="error">An error occurred</p>
      </article>
    );
  if (!product) return <NotFound />;

  return (
    <React.Fragment>
      <Header />
      <Item product={product} />
      <Footer />
    </React.Fragment>
  );
};

export default ProductPage;
