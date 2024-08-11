import React from "react";
import styles from "./added.module.css";
import Plus from "../../../assets/svg/plus.svg";
import Minus from "../../../assets/svg/minus.svg";

const AddedControl: React.FC = () => {
  return (
    <section className={styles.addedContainer}>
      <button className={styles.added} aria-label="Decrease count">
        <img src={Minus} alt="Minus" className={styles.icon} />
      </button>
      <p className={styles.addedCount} aria-live="polite">
        count
      </p>
      <button className={styles.added} aria-label="Increase count">
        <img src={Plus} alt="Plus" className={styles.icon} />
      </button>
    </section>
  );
};

export default AddedControl;
