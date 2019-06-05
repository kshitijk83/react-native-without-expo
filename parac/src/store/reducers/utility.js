export const utility = (state, property) => {
    return {
        ...state,
        ...property
    }
}