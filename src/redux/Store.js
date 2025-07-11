import { configureStore } from "@reduxjs/toolkit";
import  CartSlice  from "./Slices/CartSlice";
import userReducer from './Slices/userSlice';
import productReducer from './Slices/productSlice';
import filtersReducer from "./Slices/filtersSlice";
import orderFiltersSlice from "./Slices/orderFiltersSlice";
import ordersSlice from "./Slices/ordersSlice";
import adminordersSlice from "./Slices/adminordersSlice";

export const store=configureStore({
    reducer:{
        // key=slice name wich we give   and value =slicename whoch we give to function
        Cart:CartSlice,
         user: userReducer,
        products: productReducer,
         filters: filtersReducer,
         orders:ordersSlice,
         orderFilters:orderFiltersSlice ,
         adminorders:adminordersSlice

    }
})