import React from "react";
import { Link } from "react-router-dom";
import styles from "./content.module.css";

interface CardProps {
  productId: string;
  width?: "small" | "medium";
}

const Content: React.FC<CardProps> = ({ productId, width = "medium" }) => {
  const contentClass =
    width === "small" ? styles.contentSmall : styles.contentMedium;

  return (
    <section className={`${styles.content} ${contentClass}`}>
      <div className={styles.description}>
        <Link
          to={`/product/${productId}`}
          className={`${styles.title} ${contentClass}`}
          aria-label="Essence Mascara Lash Princess"
          role="link"
        >
          Essence Mascara Lash Princess
        </Link>
        <span className={styles.price} aria-label="Price: $110">
          $110
        </span>
      </div>
    </section>
  );
};

export default Content;
