import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import withErrorhandler from '../../hoc/withErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import { fetchOrders } from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {
    // state = {
    //     loading:true,
    //     orders:[],
    // }
    componentDidMount() {
        // axios.get('orders.json').then((res) => {
        //     const fetchedOrders = [];
        //     for (let key in res.data) {
        //         fetchedOrders.push({...res.data[key],id:key});
        //     }
        //    this.setState({loading:false,orders:fetchedOrders});
        // }).catch((error) =>   this.setState({loading:false}))

        this.props.onFetchOrders(this.props.token, this.props.userId);
    }
    render() {
        console.log(this.props.orders);
        let orders = <Spinner />;

        if (!this.props.isFetching) {
            orders = this.props.orders.map(order => {
                return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
            });
        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        orders: state.order.orders,
        isFetching: state.order.isFetching,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withErrorhandler(Orders, axios));