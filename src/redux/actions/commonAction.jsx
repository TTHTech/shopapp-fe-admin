import { COMMON_MESSAGE_SET, COMMON_ERROR_SET } from './actionTypes';

export const setMessage = (message) => async(dispatch) => {
    dispatch({
        type: COMMON_MESSAGE_SET,
        payload: message,
    });
}
export const setError = (error) => (dispatch) => {
    dispatch({
        type: COMMON_ERROR_SET,
        payload: error,
    });
}
export const setLoading = (loading) => (dispatch) => {
    dispatch({
        type: COMMON_ERROR_SET,
        payload: loading,
    });
}