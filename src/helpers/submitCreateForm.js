import store  from '../store/index.js';
import setRangeData from '../helpers/setRangeData';
import { createProject } from '../api';
import { updateUser } from '../store/slices/userSlice';
import { addProject } from '../store/slices/projectSlice';

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
        store.dispatch(updateUser(user))  
      }
      // add new project to redux store
      store.dispatch(addProject(project))
      relaunchProject && projectStatus(true)
      !relaunchProject && pushUser()
    }
  })
}

export default createOnSubmit;