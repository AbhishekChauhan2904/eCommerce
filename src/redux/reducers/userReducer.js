import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../firebase";
import { resetAlert, setAlert } from "./alertReducer";

const initialState = {
  userInfo: "",
  userCartData: [],
};
export const fetchUserCart = createAsyncThunk(
  "user/fetchCart",
  (arg, thunkAPI) => {
    onSnapshot(doc(db, "user-cart", arg), (doc) => {
      // console.log(doc.data().userCart);
      thunkAPI.dispatch(uesrAction.setUserCart(doc.data().userCart));
    });
  }
);
export const addProductsInCart = createAsyncThunk(
  "user/addProd",
  async ({ newProd, userEmail, userCartData }, thunkAPI) => {
    const objectIndex = userCartData.findIndex(
      (obj) => obj.prod.id === newProd.id
    );

    if (objectIndex === -1) {
      //console.log(userEmail);
      const prodRef = doc(db, "user-cart", userEmail);
      //console.log(prodRef);
      //console.log({ prod: newProd, count: 1 });
      await updateDoc(prodRef, {
        userCart: arrayUnion({ prod: newProd, count: 1 }),
      });
    } else {
      console.log("Product already exists");
      thunkAPI.dispatch(setAlert("This Product is already in the cart"));
      setTimeout(() => thunkAPI.dispatch(resetAlert("")), 2000);
    }
  }
);
export const removeProductInCart = createAsyncThunk(
  "user/removeProd",
  async (arg, thunkAPI) => {
    const prodRef = doc(db, "user-cart", arg.userEmail);

    // Atomically add a new region to the "regions" array field.
    await updateDoc(prodRef, {
      userCart: arrayRemove(arg.prod),
    });
  }
);
export const changeProdCountInCart = createAsyncThunk(
  "user/incProdCount",
  async ({ userCartData, userEmail, prod, newValue }, thunkAPI) => {
    const docRef = doc(db, "user-cart", userEmail);

    // const objectIndex = userCartData.findIndex((obj) => obj.id === prod.id);
    // console.log(objectIndex);
    // Create a new object with the updated field
    const updatedObject = { prod: { ...prod }, count: newValue };
    console.log(prod.id);
    // Create a new array with the updated object
    const updatedArray = userCartData.map((obj) =>
      obj.prod.id === prod.id ? { ...updatedObject } : obj
    );

    // Update the document
    await updateDoc(docRef, {
      userCart: updatedArray,
    });
  }
);
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      console.log(action.payload);
      state.userInfo = action.payload;
    },
    setUserCart: (state, action) => {
      console.log(action.payload);
      state.userCartData = action.payload;
    },
    addProducts: (state, action) => {},
    deleteProducts: (state, action) => {},
    incQuantity: (state, action) => {},
    decQuantity: (state, action) => {},
  },
});

export const userReducer = userSlice.reducer;
export const uesrAction = userSlice.actions;
export const userSelector = (state) => state.userReducer;
