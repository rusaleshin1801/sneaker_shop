import React from "react";
import styles from "./added.module.css";
import Plus from "../../../assets/svg/plus.svg";
import Minus from "../../../assets/svg/minus.svg";
import { CartProduct } from "../../../types/types";

interface AddedItemProps {
  product: CartProduct;
}

const AddedControl: React.FC<AddedItemProps> = ({ product }) => {
  return (
    <section className={styles.container}>
      <button className={styles.added} aria-label="Decrease count">
        <img src={Minus} alt="Minus" className={styles.icon} />
      </button>
      <p className={styles.count} aria-live="polite">
        {product.quantity} items
      </p>
      <button className={styles.added} aria-label="Increase count">
        <img src={Plus} alt="Plus" className={styles.icon} />
      </button>
    </section>
  );
};

export default AddedControl;
