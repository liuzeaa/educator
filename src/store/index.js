import {createStore,applyMiddleware,compose} from  'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (initialState) => {
    return createStore(
        reducer,
        initialState,
        // compose(applyMiddleware(thunkMiddleware), window.devToolsExtension && window.devToolsExtension())
        composeEnhancers(applyMiddleware(thunkMiddleware))
    )
}

export default configureStore;
