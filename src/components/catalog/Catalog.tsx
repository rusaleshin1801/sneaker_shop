import React from "react";
import styles from "./catalog.module.css";
import Card from "../../ui/component/card/Card";
import Content from "../../ui/component/content/Content";
import CartBtn from "../../ui/component/cartBtn/Cart";
import AddedItem from "../../ui/component/addedItem/AddedItem";
import Button from "../../ui/component/button/Button";

interface Product {
  id: string;
  title: string;
}

const Catalog: React.FC = () => {
  const products: Product[] = [
    { id: "1", title: "Product 1" },
    { id: "2", title: "Product 2" },
    { id: "3", title: "Product 3" },
    { id: "4", title: "Product 4" },
    { id: "5", title: "Product 5" },
    { id: "6", title: "Product 6" },
    { id: "7", title: "Product 7" },
    { id: "8", title: "Product 8" },
    { id: "9", title: "Product 9" },
    { id: "10", title: "Product 10" },
    { id: "11", title: "Product 11" },
    { id: "12", title: "Product 12" },
  ];

  return (
    <article className={styles.catalogMain} id="catalog">
      <section className={styles.catalogContainer}>
        <h2 className={styles.catalogTitle}>Catalog</h2>
        <input
          className={styles.catalogSearch}
          placeholder="Search by title"
          aria-label="Search by product title"
        />
        <div className={styles.catalogCardContainer}>
          {products.map((product) => (
            <section className={styles.catalogCard} key={product.id}>
              <Card productId={product.id} productTitle={product.title} />
              <div className={styles.catalogContentContainer}>
                <Content
                  productId={product.id}
                  width={product.id === "6" ? "small" : "medium"}
                />
                {product.id === "6" ? <AddedItem /> : <CartBtn />}
              </div>
            </section>
          ))}
        </div>
        <div className={styles.catalogBtnContainer}>
          <Button
            text="Show more"
            width="small"
            ariaLabel="Show more products"
          />
        </div>
      </section>
    </article>
  );
};

export default Catalog;
