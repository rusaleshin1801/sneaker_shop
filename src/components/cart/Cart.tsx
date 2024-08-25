import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Content from "../../ui/component/content/Content";
import AddedControl from "../../ui/component/add-control/AddControl";
import CartButton from "../../ui/component/cartBtn/Cart";
import { useAppDispatch } from "../../hook/useAppDispatch";
import { useAppSelector } from "../../hook/useAppSelector";
import {
  setQuantities,
  updateQuantity,
  removeProduct,
  addProduct,
} from "../../store/slices/quantitiesSlice";
import {
  useUpdateCartMutation,
  useGetCurrentUserQuery,
} from "../../store/slices/getProductApi";
import Loading from "../loading/Loading";
import Error from "../error/Error";
import NoItems from "./NoItems";
import styles from "./cart.module.css";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cart, loading } = useAppSelector((state) => state.cart);
  const cartData = useAppSelector((state) => state.cartData.cartData);
  const quantities = useAppSelector((state) => state.quantities.quantities);
  const dataToUse = cartData && cartData.products.length ? cartData : cart;
  const totalItems = quantities.filter((item) => item.quantity > 0).length;
  const totalWithoutDiscount = quantities.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );
  const totalWithDiscount = quantities.reduce(
    (sum, item) => sum + item.discountedPrice,
    0
  );

  const [updateCart] = useUpdateCartMutation();
  const { data: user } = useGetCurrentUserQuery();

  useEffect(() => {
    if (dataToUse && dataToUse.products.length > 0) {
      const initialQuantities = dataToUse.products.map((product) => {
        const totalPrice = product.price * product.quantity;
        const discountedPrice =
          totalPrice - (totalPrice * product.discountPercentage) / 100;
        return {
          id: product.id,
          quantity: product.quantity,
          totalPrice: totalPrice,
          discountedPrice: parseFloat(discountedPrice.toFixed(2)),
        };
      });
      dispatch(setQuantities(initialQuantities));
    }
  }, [dataToUse, dispatch]);

  useEffect(() => {
    if (user && quantities.length > 0) {
      const updatedProducts = quantities.map(({ id, quantity }) => ({
        id,
        quantity,
      }));
      updateCart({ userId: user.id, products: updatedProducts });
    }
  }, [quantities, user, updateCart]);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    } else {
      dispatch(updateQuantity({ id, quantity: 0 }));
    }
  };

  const handleDelete = (id: number) => {
    dispatch(removeProduct(id));
  };

  const handleAddProduct = (productId: number) => {
    const product = dataToUse.products.find((p) => p.id === productId);
    if (product) {
      dispatch(addProduct(product));
    }
  };

  if (loading === "pending") {
    return <Loading />;
  }
  if (loading === "failed") {
    return <Error />;
  }
  if (!dataToUse || !dataToUse.products.length) {
    return <NoItems />;
  }

  return (
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
          {dataToUse.products.map((product) => {
            const quantity =
              quantities.find((item) => item.id === product.id)?.quantity || 0;
            const imgClassName =
              quantity > 0
                ? styles.itemImage
                : `${styles.itemImage} ${styles.blurredImage}`;
            return (
              <div
                key={product.id}
                className={styles.cartForm}
                role="group"
                aria-labelledby={`product-title-${product.id}`}
              >
                <Link
                  to={`/product/${product.id}`}
                  role="link"
                  className={styles.cartFormImg}
                >
                  <img
                    src={product.thumbnail}
                    alt={`Image of ${product.title}`}
                    className={imgClassName}
                  />
                  <Content product={product} quantity={quantity} />
                </Link>
                {quantity > 0 ? (
                  <>
                    <AddedControl
                      quantity={quantity}
                      onQuantityChange={(newQuantity) =>
                        handleQuantityChange(product.id, newQuantity)
                      }
                    />
                    <button
                      className={styles.cartBtnDelete}
                      aria-label={`Delete ${product.title}`}
                      onClick={() => handleDelete(product.id)}
                    >
                      delete
                    </button>
                  </>
                ) : (
                  <CartButton onClick={() => handleAddProduct(product.id)} />
                )}
              </div>
            );
          })}
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
              {totalItems} items
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
              ${totalWithoutDiscount.toFixed(2)}
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
              ${totalWithDiscount.toFixed(2)}
            </span>
          </div>
        </div>
      </section>
    </article>
  );
};

export default Cart;
