import store  from '../store/index.js';
import { createProject } from '../api';
import { UPDATE_USER, ADD_PROJECT, REMOVE_USER_FROM_TEMP_PROJECT } from '../store/type';

const submitForm = (e, { title, description, dateRange, addUsersId, relaunchProject, loaderStatus }) => {
  e.preventDefault()

  const dateArray = dateRange.match(/.{1,12}/g)
  const startDate = dateArray[0].split(" ")[0].split("-").join("/")
  const dueDate = dateArray[1].split(" ")[1].split("-").join("/")

  const newProject = {
    name: title,
    description: description,
    startDate: startDate,
    dueDate: dueDate,
    assigned: [...addUsersId]
  }

  createProject(newProject)
  .then(data => {
    if (data.error) {
      console.log("ERROR -->", data)
    } else {
      // update each user in the redux store
      for (let user of data.users) {
        store.dispatch({ type: UPDATE_USER, payload: user })  
      }
      // add new project to redux store
      store.dispatch({ type: ADD_PROJECT, payload: data.project })
      relaunchProject && loaderStatus(false)
    }
    // remove users from temporary array in the redux store 
    store.dispatch({ type: REMOVE_USER_FROM_TEMP_PROJECT, payload: [] })

  })
}

export default submitForm;