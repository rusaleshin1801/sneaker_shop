import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartByUserId } from "../../store/slices/cartSlice";
import { useGetProductsQuery } from "../../store/slices/getProductApi";
import { RootState, AppDispatch } from "../../store/store";
import Card from "../../ui/component/card/Card";
import Content from "../../ui/component/content/Content";
import CartBtn from "../../ui/component/cartBtn/Cart";
import AddedControl from "../../ui/component/add-control/AddControl";
import Button from "../../ui/component/button/Button";
import { Product, CartProduct } from "../../types/types";
import useDebounce from "../../hook/useDebounce";
import styles from "./catalog.module.css";

const Catalog: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showMore, setShowMore] = useState<number>(12);
  const [searchItem, setSearchItem] = useState<string>("");
  const debouncedSearchItem = useDebounce(searchItem, 500);

  const { data, error, isLoading } = useGetProductsQuery(debouncedSearchItem);
  const { cart, loading: cartLoading } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    if (!cart && cartLoading === "idle") {
      dispatch(fetchCartByUserId());
    }
  }, [dispatch, cart, cartLoading]);

  const handleShowMore = (): void => {
    if (data?.products.length) {
      setShowMore((prevCount) =>
        Math.min(prevCount + 12, data.products.length)
      );
    }
  };

  const hasMoreProducts: boolean = data
    ? showMore < data.products.length
    : false;

  const products = data?.products.slice(0, showMore) || [];

  const cartProductIds = cart?.products.map((product) => product.id) || [];

  if (isLoading)
    return (
      <article className="loading-container" role="status" aria-live="polite">
        <p className="loading">Loading...</p>
      </article>
    );

  if (error)
    return (
      <article className="error-container" role="alert" aria-live="assertive">
        <p className="error">An error occurred</p>
      </article>
    );

  return (
    <article className={styles.catalogMain} id="catalog">
      <section className={styles.catalogContainer}>
        <h2 className={styles.catalogTitle}>Catalog</h2>
        <input
          type="text"
          className={styles.catalogSearch}
          placeholder="Search by title"
          aria-label="Search by product title"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
        <div className={styles.catalogCardContainer}>
          {products.map((product: Product) => {
            const isInCart = cartProductIds.includes(product.id);

            return (
              <section className={styles.catalogCard} key={product.id}>
                <Card product={product} />
                <div className={styles.catalogContentContainer}>
                  <Content
                    product={product}
                    width={isInCart ? "small" : "medium"}
                  />
                  {isInCart ? (
                    <AddedControl
                      product={
                        (cart &&
                          cart.products.find((p) => p.id === product.id)) ||
                        ({} as CartProduct)
                      }
                    />
                  ) : (
                    <CartBtn />
                  )}
                </div>
              </section>
            );
          })}
        </div>
        {hasMoreProducts && (
          <div className={styles.catalogBtnContainer}>
            <Button
              text="Show more"
              width="small"
              ariaLabel="Show more products"
              onClick={handleShowMore}
              disabled={!hasMoreProducts}
              className={`${styles.btn} ${
                !hasMoreProducts ? styles.btnDisabled : ""
              }`}
            />
          </div>
        )}
      </section>
    </article>
  );
};

export default Catalog;
