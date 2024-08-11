import React from "react";
import styles from "./item.module.css";
import Grade from "../../assets/svg/grade.svg";
import Button from "../../ui/component/button/Button";

interface Product {
  id: string;
  title: string;
  image: string;
}

const Item: React.FC = () => {
  const imageUrl =
    "https://s3-alpha-sig.figma.com/img/6a4c/cb73/3d5636cb20ebbdfd22ef229cec9df732?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jLi~z0RHQY-PvWgk~zpgrvOHbO~kOdH1nzTQxZOi2G0vcbmPap4cDAoCnzV5jceEbH9ATzFu--sv~fer-qW2EHMyUxCQQgZs-dDmy87hO4TiN8iLaWlhhz7nVCdnyRfiWKbjm0n-Cc0XBX5RCa0Mw~NLRfLVGW95xCPPLztlZplspfdXMLmapale3CBc2xnVFKBZ6Z7AsdbXrImnxFqAj7Jcn8G9KRiJNX25W7IfqrjNK6OwZngA2Z4fXLTXQM2SUoSqdU6r~SIAetxwygdyh2w3TWvMF8XOzPLqw9Nb8hmOtQQH9davETEzEhxbZFqwNuv4nIgy~692fo1v82T8EQ__";

  const products: Product[] = [
    { id: "1", title: "Product 1", image: imageUrl },
    { id: "2", title: "Product 2", image: imageUrl },
    { id: "3", title: "Product 3", image: imageUrl },
    { id: "4", title: "Product 4", image: imageUrl },
    { id: "5", title: "Product 5", image: imageUrl },
    { id: "6", title: "Product 6", image: imageUrl },
    { id: "7", title: "Product 7", image: imageUrl },
  ];

  return (
    <main className={styles.itemMain}>
      <article className={styles.itemContainer}>
        <section
          className={styles.itemImgSection}
          aria-labelledby="product-images"
        >
          <img
            src={imageUrl}
            alt="Main product image"
            className={styles.itemImage}
            aria-describedby="main-image-description"
          />
          <div
            className={styles.itemImgSectionItems}
            aria-label="Product gallery"
          >
            {products.map((product) => (
              <img
                key={product.id}
                src={product.image}
                alt={product.title}
                className={styles.itemsImage}
                aria-label={product.title}
              />
            ))}
          </div>
        </section>
        <section
          className={styles.itemDescriptionSection}
          aria-labelledby="item-details"
        >
          <h1 className={styles.itemTitle}>Essence Mascara Lash Princess</h1>
          <div className={styles.itemGrade}>
            <img src={Grade} alt="Product rating" />
            <span className={styles.itemGradeDescription}>
              electronics, selfie accessories
            </span>
          </div>
          <div className={styles.itemStoke}>
            <span className={styles.itemStokeDescription}>
              In Stock - Only 5 left!
            </span>
          </div>
          <div className={styles.itemDescriptionDiv}>
            <span className={styles.itemDescription}>
              The Essence Mascara Lash Princess is a popular mascara known for
              its volumizing and lengthening effects. Achieve dramatic lashes
              with this long-lasting and cruelty-free formula.
            </span>
            <span className={styles.itemMonth}>1 month warranty</span>
            <span className={styles.itemMonth}>Ships in 1 month</span>
          </div>
          <section className={styles.itemByuSection}>
            <div className={styles.itemPriceSection}>
              <span className={styles.itemPrice} aria-label="Price">
                $7.17
              </span>
              <span
                className={styles.itemDiscount}
                aria-label="Discounted Price"
              >
                $9.99
              </span>
            </div>
            <div className={styles.itemPersonalDiscount}>
              <span className={styles.itemPersonalYourDiscount}>
                Your discount:
              </span>
              <span className={styles.itemPersonalDiscountPercent}>14.5%</span>
            </div>
            <Button text="Add to cart" width="small" aria-label="Add to cart" />
          </section>
        </section>
      </article>
    </main>
  );
};

export default Item;
