import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/notFound.module.css";

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h2 className={styles.notFoundTitle}>404</h2>
      <p className={styles.notFoundMessage}>Oops! Page not found.</p>
      <Link to="/" className={styles.notFoundLink}>
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
