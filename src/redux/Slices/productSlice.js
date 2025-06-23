// // src/redux/slices/productSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const productSlice = createSlice({
//   name: 'products',
//   initialState: {
//     posts: [],
    
//   },
//   reducers: {
//     setProducts(state, action) {
//       state.posts = action.payload;
//     }
//   }
// });

// export const { setProducts } = productSlice.actions;
// export default productSlice.reducer;


// after we plce the order so qunity of the product will be changed or whent he admin update the product the product value may be change so after every update
// //  ✅ Option 1: Best Practice — Refetch Products After Order  
// // option one is the best we will use hte dispatch(fetchFilteredProducts());

//  Option 2: Manual Local Update After Order
// If you don’t want to refetch, you can update stock like this:




import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    posts: [],
    Totalproducts:0,
  },
  reducers: {
    setProducts(state, action) {
      state.posts = action.payload;
    },
    setTotalproduct(state,action){
      state.Totalproducts=action.payload;

    },
    updateStock(state, action) {

      // here no need of this becuse ech time when we plce the order then we will agin fech all the product and we are updatign the product in the backend effintly ok 
      const { productId, orderedQty } = action.payload;
      const product = state.posts.find((p) => p._id === productId);
      if (product) {
        product.quantity -= orderedQty;
        if (product.quantity < 0) product.quantity = 0;
      }
    }
  }
});

export const { setProducts, updateStock, setTotalproduct } = productSlice.actions;
export default productSlice.reducer;
