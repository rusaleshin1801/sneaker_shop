import React from "react";
import { Link as RouterLink } from "react-router-dom";
import styles from "./cart.module.css";
import Basket from "../../../assets/svg/basket.svg";

const CartLink: React.FC = () => {
  return (
    <RouterLink
      to="/cart"
      className={styles.link}
      aria-label="Go to cart"
      role="link"
    >
      <img src={Basket} alt="Shopping basket icon" width={18} height={18} />
    </RouterLink>
  );
};

export default CartLink;
