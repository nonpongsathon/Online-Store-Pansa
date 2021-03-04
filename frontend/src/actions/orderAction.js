import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_ITEMS_DETAILS_FAIL,
  ORDER_ITEMS_DETAILS_REQUEST,
  ORDER_ITEMS_DETAILS_SUCCESS,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_ADMIN_LIST_SUCCESS,
  ORDER_ADMIN_LIST_REQUEST,
  ORDER_ADMIN_LIST_FAIL,
  ORDER_ADMIN_DELETE_REQUEST,
  ORDER_ADMIN_DELETE_FAIL,
  ORDER_ADMIN_DELETE_SUCCESS,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
} from "../constants/orderConstants";
import axios from "axios";

export const createOrder = (
  shippingAddress,
  totalPrice,
  totalQty,
  paid,
  delivered
) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_CREATE_REQUEST,
  });

  try {
    let order = {
      shippingAddress: shippingAddress,
      totalPrice: totalPrice,
      totalQty: totalQty,
      paid: paid,
      delivered: delivered,
    };

    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await axios.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    localStorage.setItem("order", JSON.stringify(getState().orderCreate.order));
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};

export const detailsItemsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_ITEMS_DETAILS_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/orders/details/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_ITEMS_DETAILS_SUCCESS, payload: data });
    localStorage.setItem("orderItems", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_ITEMS_DETAILS_FAIL, payload: message });
  }
};

export const listOrderMine = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_MINE_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get("/api/orders/mine", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message });
  }
};

export const listOrderAdmin = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_ADMIN_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get("/api/orders", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_ADMIN_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_ADMIN_LIST_FAIL, payload: message });
  }
};

export const deleteOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_ADMIN_DELETE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_ADMIN_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_ADMIN_DELETE_FAIL, payload: message });
  }
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELIVER_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    await axios.put(
      `/api/orders/${orderId}/deliver`,
      { delivered: new Date().toLocaleString() },
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );
    dispatch({ type: ORDER_DELIVER_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELIVER_FAIL, payload: message });
  }
};

export const payOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_PAY_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    await axios.put(
      `/api/orders/${orderId}/pay`,
      { paid: true },
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );
    dispatch({ type: ORDER_PAY_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_PAY_FAIL, payload: message });
  }
};
