import React from "react";
import { Link } from "react-router-dom";
import styles from "./content.module.css";
import { Product, CartProduct } from "../../../types/types";

interface ContentProps {
  product: Product | CartProduct;
  width?: "small" | "medium";
}

const Content: React.FC<ContentProps> = ({ product, width = "medium" }) => {
  const contentClass =
    width === "small" ? styles.contentSmall : styles.contentMedium;

  const discountPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <section className={`${styles.content} ${contentClass}`}>
      <div className={styles.description}>
        <Link
          to={`/product/${product.id}`}
          className={`${styles.title} ${contentClass}`}
          aria-label={product.title}
          role="link"
        >
          {product.title}
        </Link>
        <span
          className={styles.price}
          aria-label={`Price: $${discountPrice.toFixed(2)}`}
        >
          ${discountPrice.toFixed(2)}
        </span>
      </div>
    </section>
  );
};

export default Content;
