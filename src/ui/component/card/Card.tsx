import React from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css";
import { Product } from "../../../types/types";

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      aria-label={`View details for ${product.title}`}
    >
      <figure className={styles.container}>
        <img
          src={product.thumbnail}
          alt={`Image of ${product.title}`}
          className={styles.image}
        />
        <figcaption className={styles.overlay}>
          <span className={styles.overlayText}>Show Details</span>
        </figcaption>
      </figure>
    </Link>
  );
};

export default Card;
