import * as actionTypes from './actionTypes';

export const addTodo = (todo) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: todo
    }
}

export const delTodo = (key) => {
    return {
        type: actionTypes.DELETE_INGREDIENT,
        payload: key
    }
}