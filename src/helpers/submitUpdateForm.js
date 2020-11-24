import store  from '../store/index.js';
import setRangeData from '../helpers/setRangeData';
import { editProject } from '../api';
import { UPDATE_USER, UPDATE_PROJECT, REMOVE_USER_FROM_TEMP_PROJECT, RELAUNCH_TITLE, RELAUNCH_DESCRIPTION } from '../store/type';

const updateOnSubmit = (e, { projectId, newTitle, newDescription, newDateRange, newAddedUsersId, projectStatus, runAlert, resetProjectDetails }) => {
  e.preventDefault()
  
  const range = setRangeData(newDateRange)
  console.log("newDateRange", newDateRange)

  const updatedProject = {
    name: newTitle,
    description: newDescription,
    startDate: range.startDate,
    dueDate: range.dueDate,
    assigned: [...newAddedUsersId]
  }

  console.log("updatedProject -->", updatedProject)

  editProject(projectId, updatedProject)
  .then(data => {
    if (data.error) {
      const { error, header } = data
      console.log("AN ERROR OCCURRED", data)
      projectStatus(false)
      runAlert(header, error)
    } else {
      console.log("ALL SET -->", data)
      // update each user in the redux store
      for (let user of data.users) {
        store.dispatch({ type: UPDATE_USER, payload: user })  
      }
      // add new project to redux store
      store.dispatch({ type: UPDATE_PROJECT, payload: data.project })
      projectStatus(true)
      resetProjectDetails(data.project)
    }
    // remove users from temporary array in the redux store 
    store.dispatch({ type: REMOVE_USER_FROM_TEMP_PROJECT, payload: [] })
    store.dispatch({ type: RELAUNCH_TITLE, payload: "" })
    store.dispatch({ type: RELAUNCH_DESCRIPTION, payload: "" })
  })
}

export default updateOnSubmit;