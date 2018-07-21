
export const onIncrement = () => {

    return dispatch => {
        dispatch({type: 'INCREMENT'});
    }

}

export const onDecrement = () => {
    return dispatch => {
        dispatch({type: 'DECREMENT'});
    }
}