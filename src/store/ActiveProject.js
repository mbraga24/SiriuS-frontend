import { REMOVE_USER_FROM_TEMP_PROJECT, ADD_USER_TO_TEMP_PROJECT, SET_USER_TO_TEMP_PROJECT, PROJECT_UPDATE_EXISTING_USERS } from './type';

const defaultState = {
  active: [],
  addUsersId: [],
  existingUsers: []
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_USER_TO_TEMP_PROJECT:
    return {
      ...state,
      addUsersId: action.payload
    }
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
    case PROJECT_UPDATE_EXISTING_USERS:
    return {
      ...state,
      existingUsers: [...action.payload]
    }
    default:
      return state
  }
}

export default reducer;