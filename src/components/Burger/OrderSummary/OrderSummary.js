import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingreidentSummary = Object.keys(props.ingredients).map(
        (igKey) => (
            <li key={igKey}><span style={{ textTransform: 'upperCase' }}>{igKey}</span>: {props.ingredients[igKey]}</li>
        )
    );
    console.log("OrderSummary");
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicous Burger with the following ingredients</p>
            <ul>
                {ingreidentSummary}
            </ul>
            <p><strong>Total Price : {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
        </Fragment>
    );
}
export default OrderSummary;