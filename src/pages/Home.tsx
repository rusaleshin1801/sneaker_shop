import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Hero from "../components/hero/Hero";
import Catalog from "../components/catalog/Catalog";
import Faq from "../components/faq/Faq";
import Footer from "../components/footer/Footer";

const Home: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return (
    <React.Fragment>
      <Header />
      <main>
        <Hero />
        <Catalog />
        <Faq />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
