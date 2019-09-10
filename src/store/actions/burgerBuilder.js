import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingeredientName: name
    }
};

const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingeredientName: name
    }
};

const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};

const requestsIngeredients = () =>{
    return {
        type: actionTypes.FETCH_INGREDIENTS
    }
}
const initIngredients = () => {
    return (dispatch) => {
        dispatch(requestsIngeredients())
        axios.get('https://burgerapp-74288.firebaseio.com/ingredients.json').then((res) => {
            dispatch(setIngredients(res.data))
        }).catch((error) =>
            dispatch(fetchIngredientsFailed())
        );
    }
}
export {
    addIngredient,
    removeIngredient,
    initIngredients
}