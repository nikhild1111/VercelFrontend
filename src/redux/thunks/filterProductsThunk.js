// This is a Redux Thunk — a special kind of function that:

// Can access Redux state

// Can dispatch actions

// Can do async work (like API calls)



// src/redux/thunks/filterProductsThunk.js
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
