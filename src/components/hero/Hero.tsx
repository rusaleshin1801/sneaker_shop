import React from "react";
import styles from "./hero.module.css";
import Button from "../../ui/component/button/Button";

const Hero: React.FC = () => {
  return (
    <article
      className={styles.heroContainer}
      aria-labelledby="hero-title"
      aria-describedby="hero-description"
    >
      <section className={styles.heroContent}>
        <h1 id="hero-title" className={styles.heroTitle}>
          Goods4You
        </h1>
        <h2 id="hero-description" className={styles.heroDescription}>
          Any products from famous brands
          <br />
          with worldwide delivery
        </h2>
        <p className={styles.heroProductDescription} role="doc-subtitle">
          We sell smartphones, laptops, clothes, shoes
          <br />
          and many other products at low prices
        </p>
        <Button
          text="Go to shopping"
          width="small"
          to="#catalog"
          aria-label="Go to shopping page"
        />
      </section>
    </article>
  );
};

export default Hero;
