import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoggedIn: false,
};



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;  // user info payload from backend
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    updateUserStats: (state, action) => {
  const { totalOrders, totalSpends } = action.payload;

  console.log(totalOrders ,totalSpends);
  if (state.user) {
    state.user.totalOrders = totalOrders;
    state.user.totalSpends = totalSpends;
  }
}
  }
});

export const { loginSuccess, logout, updateUserStats } = userSlice.actions;
export default userSlice.reducer;
