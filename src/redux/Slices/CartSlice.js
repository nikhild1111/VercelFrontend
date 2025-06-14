import { createSlice } from "@reduxjs/toolkit";

export  const CartSlice=createSlice({
name: "Cart",
initialState:[],
reducers:{
    // reducer funtion takes to argument state and action 
    // action.payload gives the input paramter which we pass in the input
// we can access sinle or multiple value from action.payload no need to hanle separetaly

// Redux automatically calls the CartSlice.reducer function. when we call add and then based on store and state it applies the correct reducer (add) and updates the state.
    add:(state,action)=>{
       
 // console.log(action.payload);//take id from here then give update call to backend adn then update quanty of the product when order is placed 
        state.push(action.payload);
    },
    remove:(state,action)=>{
        return state.filter((item)=>item._id!==action.payload);
    },
    clearCart:(state,action)=>{
        
        return [];
    },
    setCart: (state, action) => {
        return action.payload; // Replace the entire cart with new data
      },
}
}

);

export const {add,remove,clearCart}=CartSlice.actions;
export default CartSlice.reducer;


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
