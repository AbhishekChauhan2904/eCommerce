import { Link, NavLink, Outlet } from "react-router-dom";

import { websitelogo, shoppingcartLogo } from "../assets/exportAssets";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/reducers/userReducer";
export const Navbar = (props) => {
  const { userCartData } = useSelector(userSelector);
  return (
    <div>
      <div className="navbar">
        <nav>
          <div>
            <img alt="website-logo" style={{ height: 45 }} src={websitelogo} />
          </div>

          <NavLink
            style={({ isActive }) => ({
              display: props.login === "" ? "none" : "block",
              ...(isActive
                ? {
                    border: "2px solid #fff",
                    backgroundColor: "#e1d1f976",
                  }
                : null),
            })}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            style={({ isActive }) =>
              isActive
                ? {
                    border: "2px solid #fff",
                    backgroundColor: "#e1d1f976",
                  }
                : null
            }
            to="/login"
          >
            {props.login}
          </NavLink>

          <NavLink
            style={({ isActive }) =>
              isActive
                ? {
                    border: "2px solid #fff",
                    backgroundColor: "#e1d1f976",
                  }
                : null
            }
            to="/signup"
          >
            Signup
          </NavLink>
          <NavLink
            style={({ isActive }) =>
              isActive
                ? {
                    border: "2px solid #fff",
                    backgroundColor: "#e1d1f976",
                  }
                : null
            }
            to="/add-product"
          >
            AddPrduct
          </NavLink>
        </nav>
        <Link to="/cart-page">
          <div style={styles.cartIconContainer}>
            <img
              style={styles.cartIcon}
              alt="cart-icon"
              src={shoppingcartLogo}
            />
            <span style={styles.cartCount} id="product-count">
              {userCartData.length}
            </span>
          </div>
        </Link>
      </div>
      <div className="mainContent">
        <Outlet />
      </div>
    </div>
  );
};
const styles = {
  cartIcon: {
    height: 32,
    marginRight: 20,
  },
  // nav: {
  //   height: 70,
  //   background: "#4267b2",
  //   display: "flex",
  //   justifyContent: "flex-end",
  //   alignItems: "center",
  // },
  cartIconContainer: {
    position: "relative",
    marginRight: 75,
  },
  cartCount: {
    background: "yellow",
    borderRadius: "50%",
    padding: "4px 8px",
    position: "absolute",
    right: 4,
    top: -9,
  },
};
