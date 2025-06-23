// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   keyword: "",
//   type: "",
//   priceRange: 10000,
//   brands: [],
//   page: 1, // Add this
//    totalPages: 1, // ✅ new
// };

// const filtersSlice = createSlice({
//   name: "filters",
//   initialState,
//   reducers: {
//     setFilters: (state, action) => {
//       return { ...state, ...action.payload };
//     },
//       updatePage: (state, action) => {
//       state.page = action.payload;
//     },
//     setTotalPages: (state, action) => {
//       state.totalPages = action.payload;
//     },
//     resetFilters: () => initialState
//   }
// });

// export const { setFilters, updatePage, setTotalPages, resetFilters } = filtersSlice.actions;
// export default filtersSlice.reducer;






import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  keyword: null,
  type: null,
  priceRange: 1000,      // ✅ Always present
  brands: null,
  page: 1,
  totalPages: 1,
  sortBy: null,            // ✅ New: sort by price, rating, etc.                              // ✅ New: asc or desc                             // ✅ New: filter by min rating (e.g., 4)
  sortOrder: null,         // ✅ New: asc or desc
  minRating: null,          // ✅ New: filter by min rating (e.g., 4)
  inStock: null,               // ✅ New: true/false or null
  minDiscount: null,       // ✅ New: discount >= x%
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

export const {
  setFilters,
  updatePage,
  setTotalPages,
  resetFilters
} = filtersSlice.actions;

export default filtersSlice.reducer;
