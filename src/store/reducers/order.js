import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    isFetching: false,
    purchased: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                isFetching: false,
                purchased: true,
                orders: state.orders.concat(newOrder),
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                isFetching: false,
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                isFetching: true,
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                orders: action.orders,
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                isFetching: false,
            }
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                isFetching: true,
            }
        default:
            return state;
    }
};

export default reducer;