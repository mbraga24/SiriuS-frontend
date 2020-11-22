import store  from '../store/index.js';
import { createProject } from '../api';
import { UPDATE_USER, ADD_PROJECT, REMOVE_USER_FROM_TEMP_PROJECT } from '../store/type';

const submitForm = (e, { title, description, dateRange, addUsersId, relaunchProject, projectStatus, runAlert, pushUser }) => {
  e.preventDefault()

  let startDate;
  let dueDate;
  let dateArray;

  if (dateRange !== "") {
    dateArray = dateRange.match(/.{1,12}/g)
    if (dateArray[1] !== " ") {
      startDate = dateArray[0].split(" ")[0].split("-").join("/")
      dueDate = dateArray[1].split(" ")[1].split("-").join("/")
    } else {
      startDate = ""
      dueDate = ""  
    }
  } else {
    startDate = ""
    dueDate = ""
  }

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

export default submitForm;