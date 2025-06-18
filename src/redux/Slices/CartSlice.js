// import { createSlice } from "@reduxjs/toolkit";

// export  const CartSlice=createSlice({
// name: "Cart",
// initialState:[],
// reducers:{
//     // reducer funtion takes to argument state and action 
//     // action.payload gives the input paramter which we pass in the input
// // we can access sinle or multiple value from action.payload no need to hanle separetaly
// // Redux automatically calls the CartSlice.reducer function. when we call add and then based on store and state it applies the correct reducer (add) and updates the state.
//     add:(state,action)=>{
       
//  // console.log(action.payload);//take id from here then give update call to backend adn then update quanty of the product when order is placed 
//         state.push(action.payload);
//     },
//     remove:(state,action)=>{
//         return state.filter((item)=>item._id!==action.payload);
//     },
//     clearCart:(state,action)=>{
        
//         return [];
//     },
//     setCart: (state, action) => {
//         return action.payload; // Replace the entire cart with new data
//       },
      
// }
// }

// );

// export const {add,remove,clearCart}=CartSlice.actions;
// export default CartSlice.reducer;


// i ahve think that if the user add product in cart then incse the count of it but it will not take it and remove form cart  and if we upade its stock then it will give wrong value but not becuase if we not palce order then it will not changed in the datbase and if we delte fromt he caert next time it will be added with the right stock as each time product are fetch so ditrectky change the stock value but main the countof product 
import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

// If localStorage.getItem("cart") returns something invalid (like "null" or "{}"), then:
// So your items may end up as:
// null
// {} (an object)
// undefined
// And .some() will crash because those are not arrays.




const savedItems = Array.isArray(JSON.parse(localStorage.getItem("cart")))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
  // Utility function
const calculateCart = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.count * item.price, 0);
  return { totalItems, totalPrice };
};

const { totalItems, totalPrice } = calculateCart(savedItems);

const initialState = {
  items: savedItems,
  totalItems,
  totalPrice,
};



const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(p => p._id === item._id);

      if (existing) {
        const totalCount = existing.count + item.count;

        if (totalCount <= existing.quantity) {
          existing.count += item.count;
          console.log(existing);
          existing.quantity -= item.count; // 🆕 reduce stock
        } else {
          const allowed = existing.quantity;
          existing.count += allowed;
          existing.quantity = 0; // no more left
        }
      } else {
        // add to cart, reduce quantity by count
        const countToAdd = Math.min(item.count || 1, item.quantity);
        // console.log("in the cart",countToAdd)
        // console.log("in the cart",item.quantity)
        state.items.push({ ...item, count: countToAdd, quantity: item.quantity - countToAdd }); // 🆕 adjusted
      }

      const { totalItems, totalPrice } = calculateCart(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
    //   console.log(totalItems);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    increaseCount: (state, action) => {
      const productId = action.payload;
      const product = state.items.find(p => p._id === productId);

      if (product && product.quantity > 0) {
        product.count += 1;
        product.quantity -= 1; // 🆕 reduce stock
        localStorage.setItem("cart", JSON.stringify(state.items));
      }

      const { totalItems, totalPrice } = calculateCart(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
    },

    decreaseCount: (state, action) => {
      const productId = action.payload;
      const product = state.items.find(p => p._id === productId);

      if (product && product.count > 1) {
        product.count -= 1;
        product.quantity += 1; // 🆕 give back stock
      } else if (product && product.count === 1) {
        // remove item and restore stock
        state.items = state.items.filter(p => p._id !== productId);
      }

      const { totalItems, totalPrice } = calculateCart(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    remove: (state, action) => {
      const id = action.payload;
      const item = state.items.find(p => p._id === id);

      if (item) {
        // Restore the quantity back to full (for UI or backend fetch)
        item.quantity += item.count;
      }

      state.items = state.items.filter(p => p._id !== id);

      const { totalItems, totalPrice } = calculateCart(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      localStorage.removeItem("cart");
    },

    setCart: (state, action) => {
      state.items = action.payload;
      const { totalItems, totalPrice } = calculateCart(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

export const {
  add,
  remove,
  clearCart,
  setCart,
  increaseCount,
  decreaseCount,
} = cartSlice.actions;
export default cartSlice.reducer;
















// // CartSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// export const CartSlice = createSlice({
//   name: "Cart",
//   initialState: [],
//   reducers: {
//     add: (state, action) => {
//       const index = state.findIndex(item => item.id === action.payload.id);
//       if (index !== -1) {
//         state[index].quantity += 1;
//       } else {
//         state.push({ ...action.payload, quantity: 1 });
//       }
//     },
//     remove: (state, action) => {
//       const index = state.findIndex(item => item.id === action.payload);
//       if (index !== -1) {
//         if (state[index].quantity > 1) {
//           state[index].quantity -= 1;
//         } else {
//           state.splice(index, 1);
//         }
//       }
//     },
//     clearCart: () => {
//       return [];
//     },
//     setCart: (state, action) => {
//       return action.payload;
//     },
//   },
// });

// export const { add, remove, clearCart, setCart } = CartSlice.actions;
// export default CartSlice.reducer;
