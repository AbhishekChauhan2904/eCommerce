import "../App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { Navbar } from "./Navbar";
import { Provider } from "react-redux";
import { store } from "../redux/store";
// import { alertSelector } from "../redux/reducers/alertReducer";
import { useEffect } from "react";

// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../firebase";
import { Home } from "../pages/Home";
import { CartPage } from "../pages/CartPage";
import { AlertComp } from "./AlertComp";
import { ProductDetails } from "../pages/ProductDetails";
import { AddnewProduct } from "../pages/addNewproduct";

export default function App() {
  // const { message } = store.getState().alertReducer;
  useEffect(() => {}, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar login="login" />,
      children: [
        { index: true, element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/cart-page", element: <CartPage /> },
        { path: "/product-page/:id", element: <ProductDetails /> },
        { path: "/add-product", element: <AddnewProduct /> },

        // {
        //   path: "/",
        //   children: [
        //     { index: true, element: "" },
        //     { path: ":", element: "" },
        //   ],
        // },
      ],
    },
  ]);

  return (
    <div className="App">
      <Provider store={store}>
        <AlertComp />
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}
