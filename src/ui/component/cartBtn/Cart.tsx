import React from "react";
import styles from "./cart.module.css";
import Basket from "../../icon/basket.svg";

interface CartBtnProps {
  onClick: () => void;
}

const CartBtn: React.FC<CartBtnProps> = ({ onClick }) => {
  return (
    <button
      className={styles.link}
      aria-label="button Add to cart"
      onClick={onClick}
    >
      <img src={Basket} alt="Shopping basket icon" width={18} height={18} />
    </button>
  );
};

export default CartBtn;
