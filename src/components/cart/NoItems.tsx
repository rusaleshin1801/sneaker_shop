import React from "react";
import styles from "./cart.module.css";

const NoItems: React.FC = () => {
  return (
    <article className={styles.cartContainer} role="article">
      <h2 id="cartTitle" className={styles.cartTitle}>
        My cart
      </h2>
      <section>
        <p className={styles.cartTotalLabel} aria-live="polite">
          No items
        </p>
      </section>
    </article>
  );
};

export default NoItems;
