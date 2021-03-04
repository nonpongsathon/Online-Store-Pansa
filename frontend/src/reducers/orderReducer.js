import {
  ORDER_ADMIN_DELETE_FAIL,
  ORDER_ADMIN_DELETE_REQUEST,
  ORDER_ADMIN_DELETE_RESET,
  ORDER_ADMIN_DELETE_SUCCESS,
  ORDER_ADMIN_LIST_FAIL,
  ORDER_ADMIN_LIST_REQUEST,
  ORDER_ADMIN_LIST_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_ITEMS_DETAILS_FAIL,
  ORDER_ITEMS_DETAILS_REQUEST,
  ORDER_ITEMS_DETAILS_SUCCESS,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderMineListReducer = (
  state = { orders: [], loading: true },
  action
) => {
  switch (action.type) {
    case ORDER_MINE_LIST_REQUEST:
      return {
        loading: true,
      };
    case ORDER_MINE_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_MINE_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, order: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderDetailsItemsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_ITEMS_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_ITEMS_DETAILS_SUCCESS:
      return {
        loading: false,
        orderItems: action.payload,
      };
    case ORDER_ITEMS_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderAdminListReducer = (
  state = { orders: [], loading: true },
  action
) => {
  switch (action.type) {
    case ORDER_ADMIN_LIST_REQUEST:
      return {
        loading: true,
      };
    case ORDER_ADMIN_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_ADMIN_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderAdminDeleteReducer = (
  state = { orders: [], loading: true },
  action
) => {
  switch (action.type) {
    case ORDER_ADMIN_DELETE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_ADMIN_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_ADMIN_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_ADMIN_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return { loading: true };
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

export const orderPayReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};
