import React from "react";
import { useInitializeUser } from "../../hook/useInitializeUser";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import styles from "./styles.module.css";
import Loading from "../loading/Loading";
import Error from "../error/Error";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading, isError } = useInitializeUser();

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
