import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
import { auth, setAuthRedirect } from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

// TODO: Add Fromik abd Yup Schema
class Auth extends Component {
    state = {
        isSignup: true
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth('test@gmail.com', '123456', this.state.isSignup);
    }
    switchSignUpHandler = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        });
    }
    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetRedirectPath();
        }
    }
    render() {

        let loginForm = <form onSubmit={this.submitHandler}>
            <input type="text" placeholder="eamil" />
            <input type="password" placeholder="password" />
            <Button btnType="Success">Submit</Button>
            <Button btnType="Danger" clicked={this.switchSignUpHandler}>Switch To {this.state.isSignup ? 'Sign In' : 'Sign Up'}</Button>
        </form>;
        if (this.props.isFetching) {
            loginForm = <Spinner />
        }


        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                {loginForm}
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        isFetching: state.auth.isFetching,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger  : state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),
        onSetRedirectPath : ()=>dispatch(setAuthRedirect('/')),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));