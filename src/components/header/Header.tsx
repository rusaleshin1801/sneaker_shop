import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./header.module.css";
import Logo from "../../assets/logo/logo.svg";
import Cart from "../../assets/svg/cart.svg";
import { RootState } from "../../store/store";

const Header: React.FC = () => {
  const { cart } = useSelector((state: RootState) => state.cart);

  const totalProducts = cart?.totalProducts || 0;

  return (
    <header className={styles.headerContainer}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          <img src={Logo} alt="Logo: Goods4Yoy" width={164} height={44} />
        </Link>
        <ul className={styles.menu}>
          <li>
            <Link
              to="/#catalog"
              className={styles.headerLink}
              aria-label="Go to Catalog section"
            >
              Catalog
            </Link>
          </li>
          <li>
            <Link
              to="/#faq"
              className={styles.headerLink}
              aria-label="Go to FAQ section"
            >
              FAQ
            </Link>
          </li>
          <li className={styles.cartItem}>
            <Link
              to="/cart"
              className={styles.headerLink}
              aria-label="Go to Cart section"
            >
              Cart
              <img src={Cart} alt="Cart icon" width={20} height={20} />
              {totalProducts > 0 && (
                <span className={styles.cartCount}>{totalProducts}</span>
              )}
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={styles.headerLink}
              aria-label="Go to Profile section"
            >
              Johnson Smith
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
