import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';
import { connect } from 'react-redux';
import { authCheckState } from './store/actions';
class App extends Component {
  componentDidMount() {
    this.props.onCheckAuth();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>);
    }
    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCheckAuth: () => dispatch(authCheckState())
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    isAuth: state.auth.token !== null
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
