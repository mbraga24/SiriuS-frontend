import { SET_USERS, REMOVE_USER } from './type';

const defaultState = {
  users: []
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_USERS:
      // filter out the first user (admin)
      const filteredUsers = action.payload.filter(user => user.id !== 1)
      return {  
        ...state,
        users: [...filteredUsers]
      }
    case REMOVE_USER:
      const updatedUsers = state.users.filter(user => user.id !== action.payload.id)

      return {
        users: [...updatedUsers]
      }
    default: 
      return state
  }
}

export default reducer;