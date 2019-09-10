import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    error: false,
    totalPrice: 4,
    isFetching: false,
    building: false,
};
const INGREDEINT_PRICES = {
    cheese: 0.4,
    salad: 0.5,
    meat: 1.3,
    bacon: 0.7,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingeredientName]: state.ingredients[action.ingeredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDEINT_PRICES[action.ingeredientName],
                building: true
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingeredientName]: state.ingredients[action.ingeredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDEINT_PRICES[action.ingeredientName],
                building: true
            }
        case actionTypes.FETCH_INGREDIENTS:
            return {
                ...state,
                isFetching: true,
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                },
                totalPrice: 4,
                error: false,
                isFetching: false,
                building: false,
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true,
                isFetching: false,
            }
        default:
            return state;
    }
};

export default reducer;