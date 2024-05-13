import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, query, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

const initialState = { products: [], isLoading: true };
export const getProductsFromDB = createAsyncThunk(
  "products/initial",
  async (arg, thunkAPI) => {
    const q = query(collection(db, "products"));
    // console.log("geting product");
    const querySnapshot = await getDocs(q);
    const data1 = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      data1.push(doc.data());
    });
    thunkAPI.dispatch(setInitalProduct(data1));
  }
);

//remove product from db
export const removeProductFromDB = createAsyncThunk(
  "products/removeProduct",
  async (productId, thunkAPI) => {
    const productRef = doc(db, "products", productId);

    try {
      console.log("delete");
      // Delete the product from the Firestore collection
      await deleteDoc(productRef);
      return productId; // Return the productId for reference in the reducer
    } catch (error) {
      console.error("Error removing product: ", error);
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setInitalProduct: (state, action) => {
      // console.log(action);
      state.products = action.payload;
      state.isLoading = false;
    },
    removeProduct: (state, action) => {
      console.log(action);
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const productReducer = productSlice.reducer;
export const { setInitalProduct, removeProduct } = productSlice.actions;
export const productSelector = (state) => state.productReducer;
