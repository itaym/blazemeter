export const GET_DATA = Symbol('GET_DATA')
export const CLEAR_DATA = Symbol('CLEAR_DATA')

export const getData = () => async (dispatch) => {
    let payload = [];
    try {
        const response = await fetch('/sidebar.json');
        const text = await response.text();
        payload = text ? [].concat(JSON.parse(text)) : [];
    }
    catch {
        //Usually you do something if error.
    }

    dispatch({
        type: GET_DATA,
        payload
    });
}
export const clearData = () => async (dispatch) => {
    dispatch({
        type: CLEAR_DATA,
    });
}