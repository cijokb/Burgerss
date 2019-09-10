import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler';
import { purchaseBurger } from '../../../store/actions';
class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        // loading: false,
    }
    orderHandler = (event) => {
        event.preventDefault();
        // this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'cijo',
                address: {
                    street: 'assss',
                    zipCode: '12434',
                    country: 'India'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest',
            userId: this.props.userId
        }
        // axios.post('/orders.json', order).then(
        //     (response) => {
        //         this.setState({ loading: false});
        //         this.props.history.push('/');
        //     }
        // ).catch(error => this.setState({ loading: false}))
        this.props.orderBurger(order, this.props.token);
    }
    render() {
        let form = <form>
            <input className={classes.Input} type="text" name="name" placeholder="your name" />
            <input className={classes.Input} type="email" name="email" placeholder="your email" />
            <input className={classes.Input} type="text" name="street" placeholder="Street" />
            <input className={classes.Input} type="text" name="post" placeholder="PostalCode" />
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>;

        if (this.props.isFetching) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}

            </div>
        )

    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        isFetching: state.order.isFetching,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        orderBurger: (orderData, token) => dispatch(purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));