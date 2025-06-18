// This is a Redux Thunk — a special kind of function that:

// Can access Redux state

// Can dispatch actions

// Can do async work (like API calls)



// src/redux/thunks/filterProductsThunk.js

//  this we are using to get the product by filter but if we not pass any filter then  all product will come in the response so when wants to fetch all the product then resetfilter then send requst 

// Yes Nikhil, exactly! ✅
// After placing an order, if you call that same fetchFilteredProducts() again (just like on mount), it will refetch the latest product data from your backend — including updated stock quantities.

import axios from "axios";
import { setProducts } from "../Slices/productSlice"; // you already have this
import { setTotalPages } from "../Slices/filtersSlice";

export const fetchFilteredProducts = () => async (dispatch, getState) => {
  const filters = getState().filters;
  

  try {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/products/search`, filters);
    console.log(res.data.data);
    dispatch(setProducts(res.data.data));
     dispatch(setTotalPages(res.data.totalPages)); // ✅ Update totalPages in Redux
  } catch (err) {
    console.error("Error while filtering:", err);
    dispatch(setProducts([]));
    dispatch(setTotalPages(1)); // fallback
  }
};


// 🧠 getState() — What is it?
// In Redux Thunk, getState() is a function that gives you access to the entire Redux state from inside your async function (thunk).
// export const myThunk = () => async (dispatch, getState) => {
//   const state = getState(); // 🟢 this gives your current Redux state
// };
// ✅ When to use getState()
// Use it inside a thunk when you want to:
// Read the current state
// Send it to backend (like cart items)
// Check if user is logged in
// Conditionally dispatch something

// Great! Let's now talk about dispatch — it's super important in Redux, especially when using thunks like you're doing. 👇

// What is dispatch?
// In Redux, dispatch() is the function used to send actions to the Redux store.
// It tells Redux: "Hey, something happened — update the state!"
// It can trigger:
// Regular action (e.g., { type: "ADD_TO_CART" })
// Or a thunk (a function) when using redux-thunk middleware


// dispatch	Used to send actions to Redux store (dispatch(action))

// ❓ You're asking:
// Why use getState() and dispatch as parameters in the function?

// Can't we just import the store manually and do store.dispatch() or store.getState()?
// ✅ Yes, technically you can:
// import store from '../store';
// const token = store.getState().auth.user?.token;
// store.dispatch(someAction());
// But ❌ this is NOT recommended in thunks. Here’s why:
// 🧠 1. Thunks are automatically given dispatch and getState
// When you do this:
// dispatch(syncCartToBackend());
// Redux calls your thunk like:
// syncCartToBackend()(dispatch, getState);
// 🚫 2. Importing store directly breaks testability & reusability
// If you import store directly:
// You tie your code to a specific store instance
// Makes testing or replacing store very hard
// Breaks modularity (not flexible)

// 🔄 Summary:
// Approach                          	Easy to Use	      Clean Code	 Testable	  Recommended
// Using dispatch, getState as args	   ✅              	✅	        ✅	         ✅ Yes
// Importing store manually            	✅ (but messy) 	❌	         ❌         	❌ No




// add is login for the cart csrt confirm then login address

//add the filter to backend if the stock is zero dont show the product


