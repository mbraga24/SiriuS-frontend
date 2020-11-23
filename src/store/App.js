import { SET_KEY_HOLDER } from './type';

const defaultState = {
  keyHolder: localStorage.token ? localStorage.token : null,
  kHProjects: []
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_KEY_HOLDER:
      let kHprojects;
      action.payload ? kHprojects = [...action.payload.projects] : kHprojects = []
      return {
        ...state,
        keyHolder: action.payload,
        kHProjects: [...kHprojects]
      }
    default:
      return state
  }
}

export default reducer;