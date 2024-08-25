import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/hero/Hero";
import Catalog from "../components/catalog/Catalog";
import Faq from "../components/faq/Faq";

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
    <>
      <Hero />
      <Catalog />
      <Faq />
    </>
  );
};

export default Home;
