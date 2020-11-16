import { REMOVE_USER_FROM_TEMP_PROJECT, ADD_USER_TO_TEMP_PROJECT } from './type';

const defaultState = {
  active: [],
  addUsersId: []
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case ADD_USER_TO_TEMP_PROJECT:
    return {
      ...state,
      addUsersId: [...state.addUsersId, action.payload]
    }
    case REMOVE_USER_FROM_TEMP_PROJECT:
    return {
      ...state,
      addUsersId: [...action.payload]
    }
    default:
      return state
  }
}

export default reducer;