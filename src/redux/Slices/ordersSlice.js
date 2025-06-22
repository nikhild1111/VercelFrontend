// redux/Slices/ordersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    pendingCount: 0,
    totalOrders:0,
    error: null,
  },
  reducers: {
    fetchOrdersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess(state, action) {
      state.orders = action.payload;
      state.loading = false;
    },
    fetchOrdersFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearOrders(state) {
      state.orders = [];
      state.pendingCount = 0;
    },
    // ✅ New action
    setPendingCount(state, action) {
      state.pendingCount = action.payload;
    },
    setTotalCount(state, action) {
      state.totalOrders = action.payload;
    },
  },
});

export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  clearOrders,
  setPendingCount, 
   setTotalCount// ✅ export the new one
} = ordersSlice.actions;

export default ordersSlice.reducer;
