// redux/Slices/orderFiltersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: "",
  status: "",          // pending, shipped, etc.
  date: "",            // dd-mm-yyyy format or ISO string
  sort: "recent",      // recent or oldest
  page: 1,
  limit: 10,
  totalPages: 1,
};

const orderFiltersSlice = createSlice({
  name: "orderFilters",
  initialState,
  reducers: {
    setOrderFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateOrderPage: (state, action) => {
      state.page = action.payload;
    },
    setOrderTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    resetOrderFilters: () => initialState,
  }
});

export const {
  setOrderFilters,
  updateOrderPage,
  setOrderTotalPages,
  resetOrderFilters
} = orderFiltersSlice.actions;

export default orderFiltersSlice.reducer;
