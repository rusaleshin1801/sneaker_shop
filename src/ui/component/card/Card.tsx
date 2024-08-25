import React from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css";
import { Product } from "../../../types/types";
import Cart from "../cartBtn/Cart";
import AddControl from "../add-control/AddControl";

interface CardProps {
  product: Product;
  quantities: {
    id: number;
    quantity: number;
    totalPrice: number;
    discountedPrice: number;
  }[];
  onQuantityChange: (productId: number, newQuantity: number) => void;
  onAddToCart: (productId: number) => void;
}

const Card: React.FC<CardProps> = ({
  product,
  quantities,
  onQuantityChange,
  onAddToCart,
}) => {
  const quantity =
    quantities.find((item) => item.id === product.id)?.quantity || 0;
  const contentClass =
    quantity > 0 ? styles.contentSmall : styles.contentMedium;
  const discountPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <article className={styles.container}>
      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={`Image of ${product.title}`}
          className={styles.image}
        />
        <div className={styles.overlay}>
          <span className={styles.overlayText}>Show Details</span>
        </div>
      </Link>
      <section className={`${styles.content} ${contentClass}`}>
        <div className={styles.contentBox}>
          <Link to={`/product/${product.id}`} className={styles.title}>
            {product.title}
          </Link>
          <Link to={`/product/${product.id}`} className={styles.subtitle}>
            ${discountPrice.toFixed(2)}
          </Link>
        </div>
        {quantity > 0 ? (
          <AddControl
            quantity={quantity}
            onQuantityChange={(newQuantity) =>
              onQuantityChange(product.id, newQuantity)
            }
          />
        ) : (
          <Cart onClick={() => onAddToCart(product.id)} />
        )}
      </section>
    </article>
  );
};

export default Card;
