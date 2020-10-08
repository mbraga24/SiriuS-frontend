import { SET_USERS, REMOVE_USER, UPDATE_USER } from './type';

const defaultState = {
  users: []
}

const onlyUsers = payload => {
  return payload.filter(user => user.id !== 1)
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_USERS:
      // filter out the first user (admin)
      const filteredUsers = onlyUsers(action.payload)
      return {  
        ...state,
        users: [...filteredUsers]
      }
    case UPDATE_USER:
      const updatedUsers = state.users.map(user => {
        if (user.id !== action.payload.id) {
          return user
        } else {
          return action.payload
        }
      })
      console.log("UPDATE USERS --->", action.payload)
      console.log("UPDATE USERS - UPDATEDUSERS --->", updatedUsers)
      return {
        ...state,
        users: [...updatedUsers]
      }
    case REMOVE_USER:
      const removedUsers = state.users.filter(user => user.id !== action.payload.id)
      return {
        users: [...removedUsers]
      }
    default: 
      return state
  }
}

export default reducer;