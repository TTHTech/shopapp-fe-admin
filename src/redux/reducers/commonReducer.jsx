import { COMMON_MESSAGE_SET, COMMON_ERROR_SET, COMMON_LOADING_SET } from "../actions/actionTypes"

const initialState = {
    message: '',
    error: '',
    isLoading: false,
   
}

const commonReducer = (state = initialState, { type, payload }) => {
  switch (type) {

  case COMMON_MESSAGE_SET:
    return { ...state, message: payload }

  case COMMON_ERROR_SET:
    return { ...state, error: payload }

  case COMMON_LOADING_SET:
    return { ...state, isLoading: payload }

  default:
    return state
  }
}
export default commonReducer
