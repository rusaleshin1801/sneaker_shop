import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/notFound.module.css";

const NotFound: React.FC = () => {
  return (
    <main
      className={styles.container}
      aria-labelledby="not-found-heading"
      role="alert"
    >
      <section>
        <h1 id="not-found-heading" className={styles.title}>
          404
        </h1>
        <p className={styles.message}>Oops! Page not found.</p>
        <Link to="/" className={styles.link} aria-label="Go to the homepage">
          Go to Homepage
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
