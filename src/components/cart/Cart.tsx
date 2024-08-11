import React from "react";
import styles from "./cart.module.css";
import Content from "../../ui/component/content/Content";
import AddedItem from "../../ui/component/addedItem/AddedItem";
import CartBtn from "../../ui/component/cartBtn/Cart";

interface Product {
  id: string;
  title: string;
}

const Cart: React.FC = () => {
  const products: Product[] = [
    { id: "1", title: "Product 1" },
    { id: "2", title: "Product 2" },
    { id: "3", title: "Product 3" },
    { id: "4", title: "Product 4" },
  ];

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
            {products.map((product) => (
              <div
                key={product.id}
                className={styles.cartForm}
                role="group"
                aria-labelledby={`product-title-${product.id}`}
              >
                <div className={styles.cartFormImg}>
                  <img
                    src="https://s3-alpha-sig.figma.com/img/6a4c/cb73/3d5636cb20ebbdfd22ef229cec9df732?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jLi~z0RHQY-PvWgk~zpgrvOHbO~kOdH1nzTQxZOi2G0vcbmPap4cDAoCnzV5jceEbH9ATzFu--sv~fer-qW2EHMyUxCQQgZs-dDmy87hO4TiN8iLaWlhhz7nVCdnyRfiWKbjm0n-Cc0XBX5RCa0Mw~NLRfLVGW95xCPPLztlZplspfdXMLmapale3CBc2xnVFKBZ6Z7AsdbXrImnxFqAj7Jcn8G9KRiJNX25W7IfqrjNK6OwZngA2Z4fXLTXQM2SUoSqdU6r~SIAetxwygdyh2w3TWvMF8XOzPLqw9Nb8hmOtQQH9davETEzEhxbZFqwNuv4nIgy~692fo1v82T8EQ__"
                    alt={`Image of ${product.title}`}
                    className={styles.itemImage}
                  />
                  <Content productId={product.id} />
                </div>
                {product.id === "4" ? (
                  <div className={styles.cartFormBtnCart}>
                    <CartBtn />
                  </div>
                ) : (
                  <div className={styles.cartFormBtn}>
                    <AddedItem />
                    <button
                      className={styles.cartBtnDelete}
                      aria-label={`Delete ${product.title}`}
                    >
                      delete
                    </button>
                  </div>
                )}
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
                3 items
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
                $700
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
                $590
              </span>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
};

export default Cart;
