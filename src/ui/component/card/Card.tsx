import React from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css";

interface CardProps {
  productId: string;
  productTitle: string;
}

const Card: React.FC<CardProps> = ({ productId, productTitle }) => {
  return (
    <Link
      to={`/product/${productId}`}
      aria-label={`View details for ${productTitle}`}
    >
      <figure className={styles.cardContainer}>
        <img
          src="https://s3-alpha-sig.figma.com/img/6a4c/cb73/3d5636cb20ebbdfd22ef229cec9df732?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jLi~z0RHQY-PvWgk~zpgrvOHbO~kOdH1nzTQxZOi2G0vcbmPap4cDAoCnzV5jceEbH9ATzFu--sv~fer-qW2EHMyUxCQQgZs-dDmy87hO4TiN8iLaWlhhz7nVCdnyRfiWKbjm0n-Cc0XBX5RCa0Mw~NLRfLVGW95xCPPLztlZplspfdXMLmapale3CBc2xnVFKBZ6Z7AsdbXrImnxFqAj7Jcn8G9KRiJNX25W7IfqrjNK6OwZngA2Z4fXLTXQM2SUoSqdU6r~SIAetxwygdyh2w3TWvMF8XOzPLqw9Nb8hmOtQQH9davETEzEhxbZFqwNuv4nIgy~692fo1v82T8EQ__"
          alt={`Image of ${productTitle}`}
          className={styles.cardImage}
        />
        <figcaption className={styles.overlay}>
          <span className={styles.overlayText}>Show Details</span>
        </figcaption>
      </figure>
    </Link>
  );
};

export default Card;
