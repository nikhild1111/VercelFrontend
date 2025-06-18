import axios from 'axios';
import { setCart } from '../Slices/CartSlice';
import toast from 'react-hot-toast';

export const overwriteCartToBackend = () => async (dispatch, getState) => {
  const { items, totalItems, totalPrice } = getState().Cart;
  const token = localStorage.getItem('token');

  if (!token) return;

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/cart/savelogin`,
      { items, totalItems, totalPrice },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  if (response.data.success && response.data.items) {
  dispatch(setCart(response.data.items)); // ✅ set full cart
  toast.success(response.data.message);
} else{
   toast.success(response.data.message);
}
  } catch (err) {
    console.error("❌ Failed to overwrite cart:", err);
  }
};
