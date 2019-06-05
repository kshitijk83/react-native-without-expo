import * as actionTypes from './actionTypes';

export const setTodo = (input) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        input: input
    }
}

export const addTodo = (todo) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: todo
    }
}