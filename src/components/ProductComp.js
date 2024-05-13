import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { Tooltip } from "react-tooltip";
import { addProductsInCart, userSelector } from "../redux/reducers/userReducer";
import { Link } from "react-router-dom";
import {
  removeProductFromDB,
  removeProduct,
} from "../redux/reducers/productsReducer";
// import { setAlert } from "../redux/reducers/alertReducer";
export const Products = (props) => {
  const { userEmail, isLoggedIn } = useSelector(authSelector);
  const { userCartData } = useSelector(userSelector);
  const dispatch = useDispatch();
  const handleAddCart = () => {
    console.log(userEmail);
    dispatch(
      addProductsInCart({
        userEmail,
        newProd: props.currProd,
        userCartData,
      })
    );
    // dispatch(setAlert("This Product is already in the cart"));
    // setTimeout(() => dispatch(setAlert(null)), 3000);
  };

  const handleRemove = (productId) => {
    try {
      dispatch(removeProductFromDB(productId)).then(() => {
        dispatch(removeProduct(productId));
      });
    } catch (error) {
      console.error("Error dispatching removeProductFromDB:", error);
    }
  };

  const {
    //brand,
    category,
    //description,
    id,
    //images,
    price,
    //rating,
    //stock,
    thumbnail,
    title,
  } = props.currProd;

  return (
    <div className="productCard" style={styles.productCardStyle}>
      <Link to={`/product-page/${id}`}>
        <img
          alt="product-img"
          src={thumbnail}
          style={{ height: 250, width: 200 }}
        />
        <div style={styles.productDescpStyle}>
          <p>{title}</p>
          <p>Price: ₹{price}</p>
          <p>Category: {category}</p>
        </div>
      </Link>
      {/* conditional rendering to ensure that tooltip only appears when button is
    disabled */}
      <Tooltip id="addcart-tooltip" />
      <button onClick={() => handleRemove(props.currProd.id)}>delete</button>
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
  productCardStyle: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "19%",
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    flexWrap: "wrap",
    alignItems: "center",
    border: "2px solid gray",
  },
  productDescpStyle: {
    textWrap: "balance",
    margin: 30,
    height: 70,
    width: 160,
  },
};
