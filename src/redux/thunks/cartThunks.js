import axios from 'axios';
import { setCart } from '../Slices/CartSlice';
import toast from 'react-hot-toast';

export const syncCartToBackend = () => async (dispatch, getState) => {
  const { items, totalItems, totalPrice } = getState().Cart;
const toekn1= getState().user?.token;

  const token =localStorage.getItem('token');
  console.log(items);


  if (!token) return; // user not logged in


  console.log("jkl");
  try {
    const response =    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/cart/save`,
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
    console.error("❌ Failed to sync cart:", err);
  }
};





// const response = await axios.get('/api/cart', {
//   headers: {
//     Authorization: `Bearer ${userToken}`
//   }
// });

// dispatch(setCart(response.data.items)); // load into Redux
