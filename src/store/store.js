import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import rootReduser from '../redusers'
const initialsate={};
const middleware=[thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(rootReduser,initialsate,composeEnhancers(applyMiddleware(...middleware)));

export default store;