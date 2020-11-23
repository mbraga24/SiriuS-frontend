import { API_SUCCESS } from './type';

const defaultState = {
  isLoadingRequestIds: [],
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case API_SUCCESS:
      return {
        ...state,
        isLoadingRequestIds: [...state.isLoadingRequestIds, action.requestId]
    }
    default:
      return state
  }
}

export default reducer;