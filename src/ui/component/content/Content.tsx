import React from "react";
import styles from "./content.module.css";
import { Product, CartProduct } from "../../../types/types";

interface ContentProps {
  product: Product | CartProduct;
  quantity: number;
}

const Content: React.FC<ContentProps> = ({ product, quantity }) => {
  const contentClass =
    quantity > 0 ? styles.contentSmall : styles.contentMedium;

  const titleClass =
    quantity > 0 ? styles.title : `${styles.title} ${styles.blurredText}`;

  const priceClass =
    quantity > 0 ? styles.price : `${styles.price} ${styles.blurredText}`;

  const discountPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <section className={`${styles.content} ${contentClass}`}>
      <div className={styles.description}>
        <span className={titleClass} aria-label={product.title} role="link">
          {product.title}
        </span>
        <span
          className={priceClass}
          aria-label={`Price: $${discountPrice.toFixed(2)}`}
        >
          ${discountPrice.toFixed(2)}
        </span>
      </div>
    </section>
  );
};

export default Content;
