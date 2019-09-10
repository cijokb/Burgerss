import * as actionTypes from './actionTypes';
import { apiKey } from '../../fireBaseConfig';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = (expiry = 3600) => {
    return dispatch => setTimeout(() => dispatch(logout()), expiry * 1000);
};

export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId')
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate < new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime())/1000));
            }
        }

    }
};

//TODO: Better add sign and signup methods
export const auth = (email = 'test@gmail.com', password = '123456', isSignUp) => {
    return (dispatch) => {
        dispatch(authStart());
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
        if (!isSignUp) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
        }
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        axios.post(url, authData).then(res => {
            console.log(res);
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', res.data.localId);
            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(checkAuthTimeOut(res.data.expiresIn));
        }).catch(err => {
            console.log(err.response.data);
            dispatch(authFail(err.response.data.error));
        });
    }
}