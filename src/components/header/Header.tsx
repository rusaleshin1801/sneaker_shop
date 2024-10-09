import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hook/useAppSelector";
import Logo from "../../assets/logo/logo.svg";
import Cart from "../../ui/icon/cart.svg";
import styles from "./header.module.css";

const Header: React.FC = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const quantities = useAppSelector((state) => state.quantities.quantities);
  const { firstName, lastName } = useAppSelector((state) => state.user);
  const totalProducts = cart?.totalProducts || 0;
  const totalItems = quantities.filter((item) => item.quantity > 0).length;

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
                <span className={styles.cartCount}>
                  {totalItems ? totalItems : totalProducts}
                </span>
              )}
            </Link>
          </li>
          <li>
            <span>
              {firstName} {lastName}
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
