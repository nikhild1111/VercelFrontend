import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    pendingCount: 0,
    totalOrders: 0,
    orderCount: 0,
    userCount: 0,
    totalRevenue: 0,
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
      state.totalOrders = 0;
      state.totalPages = 0;
      state.currentPage = 1;
      state.userCount = 0;
      state.orderCount = 0;
      state.totalRevenue = 0;
    },
    setPendingCount(state, action) {
      state.pendingCount = action.payload;
    },
    setTotalCount(state, action) {
      state.totalOrders = action.payload;
    },
    setUserCount(state, action) {
      state.userCount = action.payload;
    },
    setOrderCount(state, action) {
      state.orderCount = action.payload;
    },
    setTotalRevenue(state, action) {
      state.totalRevenue = action.payload;
    },

  },
});

export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  clearOrders,
  setPendingCount,
  setTotalCount,
  setUserCount,
  setOrderCount,
  setTotalRevenue,

} = ordersSlice.actions;

export default ordersSlice.reducer;
