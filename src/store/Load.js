import { API_SUCCESS } from './type';

const defaultState = {
  isLoadingRequestIds: [],
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case API_SUCCESS:
      console.log("API SUCCESS -->", action.type)
      // const filterdIds = state.isLoadingRequestIds.filter(requestId => requestId !== action.requestId)
      return {
        ...state,
        isLoadingRequestIds: [...state.isLoadingRequestIds, action.requestId]
      // isLoadingRequestIds: state.isLoadingRequestIds.splice(state.isLoadingRequestIds.indexOf(action.requestId)).slice()
      // isLoadingRequestIds: [...filterdIds]
    }
    default:
      return state
  }
}

console.log("API OUTSIDE REDUCER SUCCESS -->", defaultState.isLoadingRequestIds)

export default reducer;