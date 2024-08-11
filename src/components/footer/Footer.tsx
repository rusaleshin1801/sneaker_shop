import React from "react";
import { Link } from "react-router-dom";
import styles from "./footer.module.css";
import Logo from "../../assets/logo/logo.svg";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footerContainer}>
      <section className={styles.nav}>
        <Link to="/" className={styles.logo}>
          <img src={Logo} alt="Logo: Goods4Yoy" width={164} height={44} />
        </Link>
        <ul className={styles.menu}>
          <li>
            <Link
              to="/#catalog"
              className={styles.footerLink}
              aria-label="Go to Catalog section"
            >
              Catalog
            </Link>
          </li>
          <li>
            <Link
              to="/#faq"
              className={styles.footerLink}
              aria-label="Go to FAQ section"
            >
              FAQ
            </Link>
          </li>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
