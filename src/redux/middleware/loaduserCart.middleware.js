// import { fetchUserCart } from "../reducers/userReducer";

// // create and export middleware function here
// export const loadUserCart = (store) => {
//   return (next) => {
//     return (action) => {
//       console.log(action.type);
//       if (action.type === "userSlice/setUserInfo") {
//         console.log(store.getState().userReducer);
//         store.dispatch(fetchUserCart(store.getState().userReducer.userInfo));
//       }
//       next(action);
//       ///console.log(store.getState());
//     };
//   };
// };
