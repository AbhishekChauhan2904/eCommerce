import { useDispatch, useSelector } from "react-redux";
import { addIcon, decIcon, deleteBtnIcon } from "../assets/exportAssets";
import {
  changeProdCountInCart,
  removeProductInCart,
  userSelector,
} from "../redux/reducers/userReducer";

export const CartProduct = (props) => {
  const { userCartData, userInfo } = useSelector(userSelector);
  //   const { userInfo } = useSelector(authSelector);
  const dispatch = useDispatch();
  const handleDeleteProd = () => {
    // console.log(userInfo);
    dispatch(
      removeProductInCart({ userEmail: userInfo, prod: props.currProd })
    );
  };
  const handleIncProd = () => {
    dispatch(
      changeProdCountInCart({
        userEmail: userInfo,
        prod: props.currProd.prod,
        newValue: props.currProd.count + 1,
        userCartData,
      })
    );
  };
  const handleDecProd = () => {
    dispatch(
      changeProdCountInCart({
        userEmail: userInfo,
        prod: props.currProd.prod,
        newValue: props.currProd.count - 1,
        userCartData,
      })
    );
  };
  const {
    //brand,
    category,
    //description,
    discountPercentage,
    //id,
    //images,
    price,
    //rating,
    //stock,
    thumbnail,
    title,
  } = props.currProd.prod;
  return (
    <div className="cartProd" style={styles.productCardStyle}>
      <img
        alt="product-img"
        src={thumbnail}
        style={{ height: 250, width: 200 }}
      />
      <div style={styles.productDescpStyle}>
        <p>{title}</p>
        <p>Price: ₹{price}</p>
        <p>
          Discounted Price: ₹
          {Math.round(price - (price * discountPercentage) / 100)}
        </p>
        <p>Category: {category}</p>
        <p>Count: {props.currProd.count}</p>
      </div>
      <div className="btnCtn" style={styles.btnCtn}>
        <button style={styles.btn} onClick={() => handleIncProd()}>
          <img alt="add-icon" src={addIcon} style={styles.btnCtnICON} />
        </button>
        <button
          disabled={props.currProd.count === 1}
          style={styles.btn}
          onClick={() => handleDecProd()}>
          <img alt="minus-icon" src={decIcon} style={styles.btnCtnICON} />
        </button>
        <button style={styles.btn} onClick={() => handleDeleteProd()}>
          <img
            alt="delete-icon"
            src={deleteBtnIcon}
            style={styles.btnCtnICON}
          />
        </button>
      </div>
    </div>
  );
};
const styles = {
  productCardStyle: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "39%",
    justifyContent: "space-between",
    margin: 10,
    flexWrap: "nowrap",
    alignItems: "center",
  },
  productDescpStyle: {
    textWrap: "balance",
    margin: 30,
    height: 70,
    width: 260,
  },
  btnCtn: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  btn: {
    margin: 10,
  },
  btnCtnICON: {
    height: 30,
    width: 30,
  },
};
