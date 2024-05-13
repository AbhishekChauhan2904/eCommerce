import { useSelector } from "react-redux";
import { userSelector } from "../redux/reducers/userReducer";

import { CartProduct } from "../components/CartProduct";
import { authSelector } from "../redux/reducers/authReducer";

export const CartPage = () => {
  const { userInfo, userCartData } = useSelector(userSelector);
  const { isLoggedIn } = useSelector(authSelector);
  return (
    <div className="cartPage" style={styles.cartPage}>
      {!isLoggedIn ? (
        <h3 style={styles.topMessage}>Login to View Content of the cart</h3>
      ) : (
        <h3 style={styles.topMessage}>Hello {userInfo}</h3>
      )}
      <div className="prodPart" style={styles.prodPart}>
        {userCartData.map((prod, index) => {
          return <CartProduct currProd={prod} key={index} />;
        })}
      </div>
    </div>
  );
};
const styles = {
  cartPage: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  prodPart: {
    display: "flex",
    flexWrap: "wrap",
    height: "100%",
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
  },
  topMessage: {
    marginRight: 10,
  },
};
