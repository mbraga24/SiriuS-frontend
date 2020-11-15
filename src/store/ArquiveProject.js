import { SET_ARQUIVE, ADD_TO_ARQUIVE, REMOVE_FROM_ARQUIVE } from './type'

const defaultState = {
  arquive: []
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_ARQUIVE:
      console.log("SET ARQUIVE --->", action.payload)
      return {
        ...state,
        arquive: [...action.payload]
      }
    case ADD_TO_ARQUIVE:
      return {
        ...state,
        arquive: [action.payload, ...state.arquive]
      }
    case REMOVE_FROM_ARQUIVE:
      console.log("REMOVE_FROM_ARQUIVE", action.payload)
      const updatedArquive = state.arquive.filter(project => project.id !== action.payload)
      return {
        ...state,
        arquive: [...updatedArquive]
      }
    default:
      return state
  }
}

export default reducer;