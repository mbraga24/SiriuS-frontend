import { SET_DOCUMENTS } from '../store/type';

const defaultState = {
  documents: []
}

const store = (state = defaultState, action) => {
  switch(action.type) {
    case SET_DOCUMENTS:
      return {
        ...state,
        documents: action.payload
      }
    default:
      return state
  }
}

export default store;