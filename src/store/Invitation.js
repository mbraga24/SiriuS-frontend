import { SET_INVITATIONS, ADD_INVITATION, REMOVE_INVITATION } from './type';

const defaultState = {
  invitations: []
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_INVITATIONS:
      return {
        ...state,
        invitations: [...action.payload]
      }
    case ADD_INVITATION:
      return {
        ...state,
        invitations: [action.payload, ...state.invitations]
      }
    case REMOVE_INVITATION:
      const filteredInvitations = state.invitations.filter(invite => invite.id !== action.payload.id)
      console.log("filteredInvitations ->", filteredInvitations)
      return {
        ...state,
        invitations: [...filteredInvitations]
      }
    default:
      return state
  }
}

export default reducer;