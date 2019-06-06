import * as actionTypes from '../actions/actionTypes';
import { utility } from './utility';

const intialState = {
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
            return {
                ...state,
                todos: state.todos.concat({
                    key: Math.random(),
                    data: action.payload,
                })
                };

        case actionTypes.DELETE_INGREDIENT:
            const todos = state.todos.filter(item=>{
                return item.key!==action.payload
            })
            return{
                ...state,
                todos: todos
            }

        default:
            return state;
    }
}

export default reducer;