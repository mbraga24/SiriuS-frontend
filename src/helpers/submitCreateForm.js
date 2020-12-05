import store  from '../store/index.js';
import setRangeData from '../helpers/setRangeData';
import { createProject } from '../api';
import { UPDATE_USER, ADD_PROJECT } from '../store/type';

const createOnSubmit = (e, { title, description, dateRange, addUsersId, relaunchProject, projectStatus, runAlert, pushUser }) => {
  e.preventDefault()
  const range = setRangeData(dateRange)

  const newProject = {
    name: title,
    description: description,
    startDate: range.startDate,
    dueDate: range.dueDate,
    assigned: [...addUsersId]
  }

  createProject(newProject)
  .then(data => {
    if (data.error) {
      const { error, header } = data
      projectStatus(false)
      runAlert(header, error)
    } else {
      const { users, project } = data
      // update each user in the redux store
      for (let user of users) {
        store.dispatch({ type: UPDATE_USER, payload: user })  
      }
      // add new project to redux store
      store.dispatch({ type: ADD_PROJECT, payload: project })
      relaunchProject && projectStatus(true)
      !relaunchProject && pushUser()
    }
  })
}

export default createOnSubmit;