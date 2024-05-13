import { useState } from "react";

import { productSelector } from "../redux/reducers/productsReducer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { Tooltip } from "react-tooltip";
import { addProductsInCart, userSelector } from "../redux/reducers/userReducer";

export const ProductDetails = () => {
  const { id } = useParams();
  const { userEmail, isLoggedIn } = useSelector(authSelector);
  const { userCartData } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { products } = useSelector(productSelector);
  const currProd = products.filter((currProd) => {
    return currProd.id === Number(id);
  });

  const handleAddCart = () => {
    console.log(userEmail);
    dispatch(
      addProductsInCart({
        userEmail,
        newProd: currProd,
        userCartData,
      })
    );
    // dispatch(setAlert("This Product is already in the cart"));
    // setTimeout(() => dispatch(setAlert(null)), 3000);
  };
  console.log(products);
  const { brand, category, discountPercentage, price, images, title } =
    currProd[0];

  const handlePrevClick = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + images.length) % images.length
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  return (
    <div style={styles.container}>
      <div>
        <span style={styles.arrow} onClick={handlePrevClick}>
          &lt;
        </span>
        <img style={styles.image} src={images[currentImageIndex]} alt={title} />
        <span style={styles.arrow} onClick={handleNextClick}>
          &gt;
        </span>
      </div>
      {/* <img style={styles.image} src={thumbnail} alt={title} /> */}
      <div style={styles.title}>{title}</div>
      <div style={styles.brand}>{brand}</div>
      <div style={styles.price}>₹{price}</div>
      <div style={styles.discount}>{discountPercentage}% off</div>
      <div>{category}</div>

      <Tooltip id="addcart-tooltip" />
      {!isLoggedIn ? (
        <button
          data-tooltip-id="addcart-tooltip"
          data-tooltip-content="Login to adds this product in cart"
          onClick={() => console.log("click")}
          disabled={!isLoggedIn}
        >
          Add to Cart
        </button>
      ) : (
        <button onClick={() => handleAddCart()} disabled={!isLoggedIn}>
          Add to Cart
        </button>
      )}
    </div>
  );
};
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    margin: "10px",
  },
  image: {
    width: "200px",
    height: "200px",
  },
  title: {
    fontWeight: "bold",
    fontSize: "20px",
    margin: "10px 0",
  },
  brand: {
    fontSize: "16px",
    color: "#555",
  },
  price: {
    fontSize: "18px",
    color: "#B12704",
    margin: "10px 0",
  },
  discount: {
    fontSize: "16px",
    color: "#007600",
  },
  arrow: {
    cursor: "pointer",
    fontSize: "2em",
    margin: "0 10px",
  },
};
