import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./cart.module.css";
import Content from "../../ui/component/content/Content";
import AddedControl from "../../ui/component/add-control/AddControl";
import { fetchCartByUserId } from "../../store/slices/cartSlice";
import { RootState, AppDispatch } from "../../store/store";

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart, loading } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (!cart && loading === "idle") {
      dispatch(fetchCartByUserId());
    }
  }, [dispatch, cart, loading]);

  if (loading === "pending") {
    return (
      <article className="loading-container" role="status" aria-live="polite">
        <p className="loading">Loading...</p>
      </article>
    );
  }

  if (loading === "failed") {
    return (
      <article className="error-container" role="alert" aria-live="assertive">
        <p className="error">Failed to load cart</p>
      </article>
    );
  }

  if (!cart) {
    return (
      <article className={styles.cartContainer} role="article">
        <h2 id="cartTitle" className={styles.cartTitle}>
          My cart
        </h2>
        <section>
          <p className={styles.cartTotalLabel} aria-live="polite">
            No items
          </p>
        </section>
      </article>
    );
  }

  return (
    <main className={styles.cartMain} role="main" aria-labelledby="cartTitle">
      <article className={styles.cartContainer} role="article">
        <h2 id="cartTitle" className={styles.cartTitle}>
          My cart
        </h2>
        <section
          className={styles.cartSection}
          role="region"
          aria-labelledby="cartTitle"
        >
          <div className={styles.cartFormContainer} role="form">
            {cart.products.map((product) => (
              <div
                key={product.id}
                className={styles.cartForm}
                role="group"
                aria-labelledby={`product-title-${product.id}`}
              >
                <div className={styles.cartFormImg}>
                  <img
                    src={product.thumbnail}
                    alt={`Image of ${product.title}`}
                    className={styles.itemImage}
                  />
                  <Content product={product} width="small" />
                </div>
                <div className={styles.cartFormBtn}>
                  <AddedControl product={product} />
                  <button
                    className={styles.cartBtnDelete}
                    aria-label={`Delete ${product.title}`}
                  >
                    delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.cartTotal} role="complementary">
            <div className={styles.cartCommon}>
              <label className={styles.cartTotalCount} id="totalCountLabel">
                Total count
              </label>
              <span
                className={styles.cartCountItems}
                aria-labelledby="totalCountLabel"
              >
                {cart.totalProducts} items
              </span>
            </div>
            <div className={styles.cartCommon}>
              <label
                className={styles.cartCommonLabel}
                id="priceWithoutDiscountLabel"
              >
                Price without discount
              </label>
              <span
                className={styles.cartCommonItems}
                aria-labelledby="priceWithoutDiscountLabel"
              >
                ${cart.total}
              </span>
            </div>
            <div className={styles.cartCommonTotalPrice}>
              <label className={styles.cartTotalLabel} id="totalPriceLabel">
                Total price
              </label>
              <span
                className={styles.cartTotalPrice}
                aria-labelledby="totalPriceLabel"
              >
                ${cart.discountedTotal}
              </span>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
};

export default Cart;
