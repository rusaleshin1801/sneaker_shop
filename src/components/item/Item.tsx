import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../ui/component/button/Button";
import AddedControl from "../../ui/component/add-control/AddControl";
import StarsRating from "../../ui/component/rating/StarsRating";
import { CartProduct, Product } from "../../types/types";
import styles from "./item.module.css";
import { RootState } from "../../store/store";

interface ItemProps {
  product: Product;
}

const Item: React.FC<ItemProps> = ({ product }) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const cart = useSelector((state: RootState) => state.cart);

  const isProductInCart = cart?.cart?.products.some(
    (cartItem: CartProduct) => cartItem.id === product.id
  );

  const cartProduct = cart?.cart?.products.find(
    (cartItem: CartProduct) => cartItem.id === product.id
  );

  const formatTags = (tags: string[]) => {
    return tags.join(", ");
  };

  const discountPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <main className={styles.main}>
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
              {formatTags(product.tags)}
            </span>
          </section>
          <section className={styles.itemStoke}>
            <span className={styles.itemStokeDescription}>
              In Stock - Only {product.stock} left!
            </span>
          </section>
          <section className={styles.itemDescriptionDiv}>
            <span className={styles.itemDescription}>
              {product.description}
            </span>
          </section>
          <section className={styles.itemByuSection}>
            <div className={styles.itemPriceSection}>
              <span className={styles.itemPrice} aria-label="Price">
                ${discountPrice.toFixed(2)}
              </span>
              <span
                className={styles.itemDiscount}
                aria-label="Discounted Price"
              >
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
            {isProductInCart && cartProduct ? (
              <AddedControl product={cartProduct} />
            ) : (
              <Button
                text="Add to cart"
                width="small"
                aria-label="Add to cart"
              />
            )}
          </section>
        </section>
      </article>
    </main>
  );
};

export default Item;
