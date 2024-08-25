import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../hook/useAppDispatch";
import { useAppSelector } from "../../hook/useAppSelector";
import {
  useGetProductByIdQuery,
  useUpdateCartMutation,
  useGetCurrentUserQuery,
} from "../../store/slices/getProductApi";
import {
  updateQuantity,
  addProduct,
  removeProduct,
} from "../../store/slices/quantitiesSlice";
import { setCartData } from "../../store/slices/cartDataSlice";

import Button from "../../ui/component/button/Button";
import AddedControl from "../../ui/component/add-control/AddControl";
import StarsRating from "../../ui/component/rating/StarsRating";
import NotFound from "../../pages/NotFound";
import Loading from "../../components/loading/Loading";
import Error from "../error/Error";
import styles from "./item.module.css";

const Item: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const {
    data: product,
    error,
    isLoading,
  } = useGetProductByIdQuery(Number(id));
  const { data: user } = useGetCurrentUserQuery();
  const [updateCart] = useUpdateCartMutation();
  const quantities = useAppSelector((state) => state.quantities.quantities);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const isProductInCart = quantities.some((item) => item.id === Number(id));
  const currentQuantity =
    quantities.find((item) => item.id === Number(id))?.quantity || 0;

  useEffect(() => {
    if (user && isProductInCart) {
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
  }, [quantities, user, updateCart, dispatch, isProductInCart]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeProduct(Number(id)));
    } else {
      dispatch(updateQuantity({ id: Number(id), quantity: newQuantity }));
    }
  };

  if (isLoading) return <Loading />;
  if (!product) return <NotFound />;
  if (error) return <Error />;

  const discountPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <article className={styles.container}>
      <section
        className={styles.itemImgSection}
        aria-labelledby="product-images"
      >
        <img
          src={activeImage || product.images[0]}
          alt="Main product image"
          className={styles.itemImage}
          aria-describedby="main-image-description"
        />
        {product.images.length > 1 && (
          <div
            className={styles.itemImgSectionItems}
            aria-label="Product gallery"
          >
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product image ${index + 1} of ${product.title}`}
                className={`${styles.itemsImage} ${activeImage === image ? styles.itemImgSectionActive : ""}`}
                aria-label={`Image ${index + 1} of ${product.title}`}
                onClick={() => setActiveImage(image)}
              />
            ))}
          </div>
        )}
      </section>

      <section
        className={styles.itemDescriptionSection}
        aria-labelledby="item-details"
      >
        <h2 className={styles.itemTitle}>{product.title}</h2>
        <section className={styles.itemGrade}>
          <div className={styles.itemRating}>
            <StarsRating rating={product.rating} />
          </div>
          <span className={styles.itemGradeDescription}>
            {product.tags.join(", ")}
          </span>
        </section>
        <section className={styles.itemStoke}>
          <span className={styles.itemStokeDescription}>
            In Stock - Only {product.stock} left!
          </span>
        </section>
        <section className={styles.itemDescriptionDiv}>
          <span className={styles.itemDescription}>{product.description}</span>
        </section>
        <section className={styles.itemByuSection}>
          <div className={styles.itemPriceSection}>
            <span className={styles.itemPrice} aria-label="Price">
              ${discountPrice.toFixed(2)}
            </span>
            <span className={styles.itemDiscount} aria-label="Discounted Price">
              ${product.price}
            </span>
          </div>
          <div className={styles.itemPersonalDiscount}>
            <span className={styles.itemPersonalYourDiscount}>
              Your discount:
            </span>
            <span className={styles.itemPersonalDiscountPercent}>
              {product.discountPercentage} %
            </span>
          </div>
          {isProductInCart ? (
            <AddedControl
              quantity={currentQuantity}
              onQuantityChange={handleQuantityChange}
            />
          ) : (
            <Button
              text="Add to cart"
              width="small"
              aria-label="Add to cart"
              onClick={() => dispatch(addProduct(product))}
            />
          )}
        </section>
      </section>
    </article>
  );
};

export default Item;
