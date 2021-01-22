import * as actionTypes from '../actionTypes/categoryItems';
import { updateObject } from '../utility';

const initialState = {
    category: [],
    selectedItems: null,
    error: null,
    loading: false
}

const createCategoryStart = (state, action) => {
    return updateObject(state, { loading: true, error: null });
}

const createCategorySuccess = (state, action) => {
    return updateObject(state, { loading: false });
}

const createCategoryFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error });
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_CATEGORY_START:
            return createCategoryStart(state, action);
        case actionTypes.CREATE_CATEGORY_SUCCESS:
            return createCategorySuccess(state, action);
        case actionTypes.CREATE_CATEGORY_FAIL:
            return createCategoryFail(state, action);
        default:
            return state;
    }
};

export default categoryReducer;

