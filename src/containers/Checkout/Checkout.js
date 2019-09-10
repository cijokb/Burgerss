import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     price: 0,
    // }
    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         console.log(param);
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }

    //     }
    //     this.setState({ ingredients, price });
    // }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        console.log(this.props.match.path);
        let summary = <Redirect to="/" />;
        if (this.props.ingredients) {
            let purchaseRedirect = this.props.purchased ? <Redirect to="/" />: null;
            summary = <div>{purchaseRedirect}<CheckoutSummary ingredients={this.props.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler} />
                { /*
                    <Route path={this.props.match.path + '/contact-data'} render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />} />
                */}
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div >
        }
        return summary;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);