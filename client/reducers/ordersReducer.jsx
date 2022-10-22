import { SET_IS_LOADING_TYPE, SET_ORDER_DATA_TYPE, SET_SALES_TYPE, SET_AVG_ORDER_VAL, SET_AVG_ORDER_SIZE } from '../constants';

export const initialOrderState = {
  isLoading: true,
  orderData: [],
  sales: 0,
  avgOrderVal: 0,
  avgOrderSize: 1,
  orderId: '',
};

const ordersReducer = (state, action) => {
  switch (action.type) {
    case SET_IS_LOADING_TYPE:
      return { ...state, isLoading: false };

    case SET_ORDER_DATA_TYPE:
      return { ...state, orderData: action.payload };

    case SET_SALES_TYPE:
      return { ...state, sales: action.payload };

    case SET_AVG_ORDER_VAL:
      return { ...state, avgOrderVal: action.payload };

    case SET_AVG_ORDER_SIZE:
      return { ...state, avgOrderSize: action.payload };

    case SET_ORDER_ID:
      return { ...state, orderId: action.payload };

    default:
      throw new Error('Action not found in reducer');
  }
};

export default ordersReducer;
