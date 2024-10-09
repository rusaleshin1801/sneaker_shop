import React, { useState, useEffect } from "react";
import { useGetProductsQuery } from "../../store/slices/getProductApi";
import { useAppDispatch } from "../../hook/useAppDispatch";
import { useAppSelector } from "../../hook/useAppSelector";
import useDebounce from "../../hook/useDebounce";
import Card from "../../ui/component/card/Card";
import Button from "../../ui/component/button/Button";
import Input from "../../ui/component/input/Input";
import { Product } from "../../types/types";
import styles from "./catalog.module.css";
import Loading from "../loading/Loading";
import Error from "../error/Error";

import {
  setQuantities,
  updateQuantity,
  addProduct,
} from "../../store/slices/quantitiesSlice";
import { useUpdateCartMutation } from "../../store/slices/getProductApi";
import { useGetCurrentUserQuery } from "../../store/slices/getProductApi";
import { setCartData } from "../../store/slices/cartDataSlice";

const Catalog: React.FC = () => {
  const dispatch = useAppDispatch();
  const [showMore, setShowMore] = useState<number>(12);
  const [searchItem, setSearchItem] = useState<string>("");
  const { cart } = useAppSelector((state) => state.cart);
  const debouncedSearchItem = useDebounce(searchItem, 500);
  const { data, error, isLoading } = useGetProductsQuery(debouncedSearchItem);
  const quantities = useAppSelector((state) => state.quantities.quantities);
  const [updateCart] = useUpdateCartMutation();
  const { data: user } = useGetCurrentUserQuery();

  useEffect(() => {
    if (cart && cart.products) {
      const initialQuantities = cart.products.map((product) => {
        const totalPrice = product.price * product.quantity;
        const discountedPrice = parseFloat(
          (
            totalPrice -
            totalPrice * (product.discountPercentage / 100)
          ).toFixed(2)
        );

        return {
          id: product.id,
          quantity: product.quantity,
          totalPrice: totalPrice,
          discountedPrice: discountedPrice,
        };
      });
      dispatch(setQuantities(initialQuantities));
    }
  }, [cart, dispatch]);

  useEffect(() => {
    if (quantities.length > 0 && user) {
      updateCart({
        userId: user.id,
        products: quantities.map((q) => ({
          id: q.id,
          quantity: q.quantity,
        })),
      })
        .unwrap()
        .then((result) => {
          dispatch(setCartData(result));
        })
        .catch((error) => {
          console.error("Ошибка при обновлении корзины:", error);
        });
    }
  }, [quantities, user, updateCart, dispatch]);

  const handleShowMore = (): void => {
    if (data?.products.length) {
      setShowMore((prevCount) =>
        Math.min(prevCount + 12, data.products.length)
      );
    }
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
  };

  const handleAddToCart = (productId: number) => {
    const product = data?.products.find((p) => p.id === productId);
    if (product) {
      dispatch(addProduct(product));
    }
  };

  const hasMoreProducts: boolean = data
    ? showMore < data.products.length
    : false;

  const products = data?.products.slice(0, showMore) || [];

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <article className={styles.catalogMain} id="catalog">
      <section className={styles.catalogContainer}>
        <h2 className={styles.catalogTitle}>Catalog</h2>
        <Input
          type="text"
          placeholder="Search by title"
          aria-label="Search by product title"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
        <div className={styles.catalogCardContainer}>
          {products.map((product: Product) => {
            return (
              <section className={styles.catalogCard} key={product.id}>
                <Card
                  product={product}
                  quantities={quantities}
                  onQuantityChange={handleQuantityChange}
                  onAddToCart={handleAddToCart}
                />
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
