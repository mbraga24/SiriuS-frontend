import store  from '../store/index.js';
import setRangeData from '../helpers/setRangeData';
import { createProject } from '../api';
import { UPDATE_USER, ADD_PROJECT, REMOVE_USER_FROM_TEMP_PROJECT } from '../store/type';

const createOnSubmit = (e, { title, description, dateRange, addUsersId, relaunchProject, projectStatus, runAlert, pushUser }) => {
  e.preventDefault()
  const range = setRangeData(dateRange)
  // console.log("newDateRange CREATE -->", dateRange)

  const newProject = {
    name: title,
    description: description,
    startDate: range.startDate,
    dueDate: range.dueDate,
    assigned: [...addUsersId]
  }

  // console.log("newProject -->", newProject)

  createProject(newProject)
  .then(data => {
    if (data.error) {
      console.log("ERROR -->", data)
      const { error, header } = data
      console.log("AN ERROR OCCURRED", data)
      projectStatus(false)
      runAlert(header, error)
    } else {
      // update each user in the redux store
      for (let user of data.users) {
        store.dispatch({ type: UPDATE_USER, payload: user })  
      }
      // add new project to redux store
      store.dispatch({ type: ADD_PROJECT, payload: data.project })
      relaunchProject && projectStatus(true)
      !relaunchProject && pushUser()
    }
    // remove users from temporary array in the redux store 
    store.dispatch({ type: REMOVE_USER_FROM_TEMP_PROJECT, payload: [] })
  })
}

export default createOnSubmit;