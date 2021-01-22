import * as actionTypes from '../actionTypes/categoryItems';
import axios from '../../apiCall-axios';
const createCategoryStart = () => {
    return {
        type: actionTypes.CREATE_CATEGORY_START
    };
};

const createCategorySuccess = (response) => {
    console.log("categorySuccess", response);
    return {
        type: actionTypes.CREATE_CATEGORY_SUCCESS,
        content: response.data
    };
};

const createCategoryFail = (error) => {
    return {
        type: actionTypes.CREATE_CATEGORY_FAIL,
        error: error
    };
};

export const createCategory = (payload) => {
    return dispatch => {
        dispatch(createCategoryStart());
        axios.post('/category',payload).then(res=> {
            dispatch(createCategorySuccess(res));
        }).catch(error => {
            dispatch(createCategoryFail(error));
        });
    }
}