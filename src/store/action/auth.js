import * as actionTypes from '../actionTypes/auth';
import axios from '../../apiCall-axios';


export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};

export const loginSuccess = (response) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        content: response.data
    };
};

export const loginFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
    };
};

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    };
};

export const signupSuccess = (response) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        content: response.data
    };
};

export const signupFail = (error) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const login = (payload) => {
    return dispatch => {
        dispatch(loginStart());
        axios.post('/users/login', payload).then(res => {
                dispatch(loginSuccess(res));
                dispatch(checkAuthTimeout(res.data.expiresIn));
        }).catch(error => {
            console.log(error);
            dispatch(loginFail(error));
        });
    };
};

export const signup = (payload) => {
    return dispatch => {
        dispatch(signupStart());
        axios.post('/users/signup', payload).then(res => {
                dispatch(signupSuccess(res))
        }).catch(error => {
            dispatch(signupFail(error));
        });
    };
};


