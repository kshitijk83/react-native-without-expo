import { combineReducers, createStore } from 'redux';
import todoReducer from './reducers/todoReducers';

const reducer = combineReducers({
    todo: todoReducer
});

const configureStore = () => {
    return createStore(reducer);
}

export default configureStore;