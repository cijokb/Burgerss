import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import { connect } from 'react-redux';
import { removeIngredient, addIngredient, initIngredients, purchaseInit, setAuthRedirect } from '../../store/actions';

// const INGREDEINT_PRICES = {
//     cheese: 0.4,
//     salad: 0.5,
//     meat: 1.3,
//     bacon: 0.7,
// }

class BurgerBuilder extends Component {
    state = {
        // ingredients: null,
        // totalPrice: 4,
        // purchasable: false,
        purchasing: false,
        //loading: false,
        // error :false,
    }
    componentDidMount() {
        // axios.get('https://burgerapp-74288.firebaseio.com/ingredients.json').then((res) => {
        //     this.setState({ ingredients: res.data })
        // }).catch((error) => this.setState({error:true}));
        this.props.loadIngredients();
    }
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map((igKey) => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    }
    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = { ...this.state.ingredients };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDEINT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({ ingredients: updatedIngredients, totalPrice: newPrice }, () => {
    //         this.updatePurchaseState();
    //     });
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = { ...this.state.ingredients };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDEINT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({ ingredients: updatedIngredients, totalPrice: newPrice }, () => {
    //         this.updatePurchaseState();
    //     });
    // }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({ purchasing: true });
        }
        else {
            this.props.onSetAuthRedirect('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }
    purchaseContinueHandler = () => {
        // const queryParams = [] ;
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price='+this.state.totalPrice);
        // const queryString = queryParams.join('&');
        // this.props.history.push({pathname:'/checkout',search:'?'+queryString});
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }
    render() {
        console.log("this.props", this.props);
        const disabledInfo = { ...this.props.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger = this.props.error ? <p>Ingerdients cannot be loaded!</p> : <Spinner />;
        if (this.props.ingredients) {
            burger = <Fragment>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.price}
                    purchasable={this.updatePurchaseState(this.props.ingredients)}
                    ordered={this.purchaseHandler}
                    isAuth={this.props.isAuth}
                />
            </Fragment>
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}
            />
        }

        if (this.props.isFetching) {
            orderSummary = <Spinner />
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("ownProps", ownProps);
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isFetching: state.burgerBuilder.isFetching,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log("ownProps", ownProps);
    return {
        // onIngredientAdded : (ingName)=> dispatch({type : actionTypes.ADD_INGREDIENT,ingeredientName: ingName}),
        // onIngredientRemoved : (ingName)=> dispatch({type : actionTypes.REMOVE_INGREDIENT,ingeredientName: ingName}),
        onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(removeIngredient(ingName)),
        loadIngredients: () => dispatch(initIngredients()),
        onInitPurchase: () => dispatch(purchaseInit()),
        onSetAuthRedirect: (path) => dispatch(setAuthRedirect(path))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));