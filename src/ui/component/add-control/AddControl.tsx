import React from "react";
import styles from "./added.module.css";
import Plus from "../../icon/plus.svg";
import Minus from "../../icon/minus.svg";

interface AddedControlProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const AddedControl: React.FC<AddedControlProps> = ({
  quantity,
  onQuantityChange,
}) => {
  const handleDecrease = () => {
    if (quantity > 0) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <section className={styles.container}>
      <button
        className={styles.added}
        aria-label="Decrease count"
        onClick={handleDecrease}
      >
        <img src={Minus} alt="Minus" className={styles.icon} />
      </button>
      <p className={styles.count} aria-live="polite">
        {quantity} items
      </p>
      <button
        className={styles.added}
        aria-label="Increase count"
        onClick={handleIncrease}
      >
        <img src={Plus} alt="Plus" className={styles.icon} />
      </button>
    </section>
  );
};

export default AddedControl;
