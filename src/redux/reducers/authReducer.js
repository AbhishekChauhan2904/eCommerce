import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../firebase";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { uesrAction } from "./userReducer";
import { fetchUserCart } from "./userReducer";
import { doc, setDoc } from "firebase/firestore";
import { setAlert } from "./alertReducer";

const INITIAL_STATE = {
  displayName: "",
  uId: "",
  userEmail: "",
  isLoggedIn: false,
};

export const userLogin = createAsyncThunk(
  "user/login",
  async (arg, thunkAPI) => {
    console.log(arg.userEmailInput, arg.userPasswordInput);
    await signInWithEmailAndPassword(
      auth,
      arg.userEmailInput,
      arg.userPasswordInput
    )
      .then((userCredential) => {
        thunkAPI.dispatch(
          setUser({
            displayName: userCredential.user.displayName,
            email: userCredential.user.email,
            id: userCredential.user.reloadUserInfo.localId,
          })
        );
        //setting userInfo in userReducer
        thunkAPI.dispatch(uesrAction.setUserInfo(userCredential.user.email));
        thunkAPI.dispatch(fetchUserCart(userCredential.user.email));
        thunkAPI.dispatch(setAlert("Succesfully LoggedIn"));
        setTimeout(() => thunkAPI.dispatch(setAlert(null)), 3000);
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        thunkAPI.dispatch(setAlert(errorMessage));
        setTimeout(() => thunkAPI.dispatch(setAlert(null)), 3000);
      });
  }
);
export const userSignUp = createAsyncThunk(
  "user/signup",
  async (arg, thunkAPI) => {
    return await createUserWithEmailAndPassword(auth, arg.email, arg.pass)
      .then((userCredential) => {
        const user = userCredential.user;
        //Adding Display name in the new user Profile
        updateProfile(user, {
          displayName: arg.name,
        });
        //creating a cart document for the user during sign up
        setDoc(doc(db, "user-cart", arg.email), {
          userInfo: arg.email,
          userCart: [],
        });
        thunkAPI.dispatch(
          setAlert("Succesfully created user with email" + arg.email)
        );
        setTimeout(() => thunkAPI.dispatch(setAlert(null)), 3000);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        thunkAPI.dispatch(setAlert(errorMessage));
        setTimeout(() => thunkAPI.dispatch(setAlert(null)), 3000);
      });
  }
);

const useAuthSlice = createSlice({
  name: "userAuth",
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload);
      state.displayName = action.payload.displayName;
      state.userEmail = action.payload.email;
      state.uId = action.payload.id;
      state.isLoggedIn = true;
    },
  },
});

export const authReducer = useAuthSlice.reducer;

export const { setUser } = useAuthSlice.actions;

export const authSelector = (state) => {
  return state.authReducer;
};
