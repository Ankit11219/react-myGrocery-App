import * as actionTypes from '../actionTypes/auth';
import { updateObject } from '../utility';
const initialState = {
    token: null,
    userInfo: null,
    error: null,
    loading: false
};

const loginStart = (state, action) => {
    return updateObject(state, { loading: true, error: null })
}

const loginSuccess = (state, action) => {
    return updateObject(state,
        { loading: false, token: action.content.token, userInfo: action.content.user });
}

const loginFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error })
}

const logout = (state, action) => {
    return updateObject(state, { token: null, userInfo: null });
}

const signupStart = (state, action) => {
    return updateObject(state, { loading: true, error: null })
}

const signupSuccess = (state, action) => {
    return updateObject(state,
        { loading: false, token: action.content.token, userInfo: action.content.user });
}

const signupFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error })
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_START:
            return loginStart(state, action);
        case actionTypes.LOGIN_SUCCESS:
            return loginSuccess(state, action);
        case actionTypes.LOGIN_FAIL:
            return loginFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return logout(state, action);
        case actionTypes.SIGNUP_START:
            return signupStart(state, action);
        case actionTypes.SIGNUP_SUCCESS:
            return signupSuccess(state, action);
        case actionTypes.SIGNUP_FAIL:
            return signupFail(state, action);
        default:
            return state;
    }
};

export default authReducer;