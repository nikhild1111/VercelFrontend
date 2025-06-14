import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: "",
  type: "",
  priceRange: 10000,
  brands: [],
  page: 1, // Add this
   totalPages: 1, // ✅ new
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
      updatePage: (state, action) => {
      state.page = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    resetFilters: () => initialState
  }
});

export const { setFilters, updatePage, setTotalPages, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;