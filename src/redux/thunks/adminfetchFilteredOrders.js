import axios from "axios";
import {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  setPendingCount,
  setTotalCount,
  setUserCount,
  setOrderCount,
  setTotalRevenue,
} from "../Slices/adminordersSlice";

import { setOrderTotalPages } from "../Slices/orderFiltersSlice";

const adminfetchFilteredOrders = () => async (dispatch, getState) => {
  try {
    dispatch(fetchOrdersStart());

    const token = localStorage.getItem("token");
    const { orderFilters } = getState();

   

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/dashboard/admin/all-orders`,
      orderFilters,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const {
      orders,
      pendingCount,
      totalOrders,
      userCount,
      orderCount,
      totalRevenue,
      pagination,
    } = response.data;



    dispatch(fetchOrdersSuccess(orders));
    dispatch(setPendingCount(pendingCount));
    dispatch(setTotalCount(totalOrders));
    dispatch(setUserCount(userCount));
    dispatch(setOrderCount(orderCount));
    dispatch(setTotalRevenue(totalRevenue));
    dispatch(setOrderTotalPages(pagination.totalPages));  
    

  } catch (err) {
    dispatch(
      fetchOrdersFailure(err.response?.data?.message || "Failed to load orders")
    );
  }
};


export default adminfetchFilteredOrders;