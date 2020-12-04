import store  from '../store/index.js';
import setRangeData from '../helpers/setRangeData';
import { editProject } from '../api';
import { UPDATE_PROJECT, REMOVE_USER_FROM_TEMP_PROJECT, RELAUNCH_TITLE, RELAUNCH_DESCRIPTION } from '../store/type';

const updateOnSubmit = (e, { projectId, newTitle, newDescription, newDateRange, projectStatus, runAlert, resetProjectDetails }) => {
  e.preventDefault()
  
  const range = setRangeData(newDateRange)
  // console.log("newDateRange", newDateRange)

  const updatedProject = {
    name: newTitle,
    description: newDescription,
    startDate: range.startDate,
    dueDate: range.dueDate
  }

  // console.log("UPDATE ON SUBMIT - updatedProject -->", updatedProject)

  editProject(projectId, updatedProject)
  .then(data => {
    if (data.error) {
      const { error, header } = data
      projectStatus(false)
      runAlert(header, error)
    } else {
      const { project } = data
      console.log("SHOW ME ALL UPDATED PROJECT -->", project)
      // update project in the redux store
      store.dispatch({ type: UPDATE_PROJECT, payload: project })
      projectStatus(true)
      resetProjectDetails(project)
    }
    // remove users from temporary array in the redux store 
    store.dispatch({ type: REMOVE_USER_FROM_TEMP_PROJECT, payload: [] })
    store.dispatch({ type: RELAUNCH_TITLE, payload: "" })
    store.dispatch({ type: RELAUNCH_DESCRIPTION, payload: "" })
  })
}

export default updateOnSubmit;