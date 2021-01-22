import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import authReducer from './store/reducer/auth';
import registerServiceWorker from './registerServiceWorker';
import categoryReducer from './store/reducer/category';

// combine multiple reducer into one and pass to the store
const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer
});

//Middleware like express
const logger = store => {
    return next => {
        return action => {
            console.log('[MiddleWare] Dispatching', action);
            console.log('[MiddleWare next ]', store.getState());
            return next(action);
        }
    }
}

// Redux developer tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// create store first argument is reducer and second is pass the middleWares
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
