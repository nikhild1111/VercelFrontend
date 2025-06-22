


// this is for the user ok


import axios from "axios";
import {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  setPendingCount, // ✅ Import the new action
  setTotalCount, // ✅ Import the new action
} from "../Slices/ordersSlice";
import { setOrderTotalPages } from "../Slices/orderFiltersSlice";

export const fetchFilteredOrders = () => async (dispatch, getState) => {
  try {
    dispatch(fetchOrdersStart());

    const token = localStorage.getItem("token");
    const { orderFilters } = getState();

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/dashboard/my-orders`,
      orderFilters,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { orders, pendingCount, totalPages ,totalOrders} = response.data;

    

    dispatch(fetchOrdersSuccess(orders));          // ✅ just orders
    dispatch(setPendingCount(pendingCount));       // ✅ set pending count separately
    dispatch(setTotalCount(totalOrders));       // ✅ set pending count separately
    dispatch(setOrderTotalPages(totalPages));      // ✅ pages update

  } catch (err) {
    dispatch(
      fetchOrdersFailure(err.response?.data?.message || "Failed to load orders")
    );
  }
};
