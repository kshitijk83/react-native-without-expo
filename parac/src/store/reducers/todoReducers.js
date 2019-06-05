import * as actionTypes from '../actions/actionTypes';
import { utility } from './utility';

const intialState = {
    input: '',
    todos: []
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.SET_INGREDIENT:
            const newState = {
                ...state,
                input: action.input
            };
            return newState;

        case actionTypes.ADD_INGREDIENT:
            const todos = [...state.todos];
            todos.push({
                key: Math.random(),
                data: action.payload
            });
            return {
                ...state,
                todos: todos
            };

        default:
            return state;
    }
}

export default reducer;