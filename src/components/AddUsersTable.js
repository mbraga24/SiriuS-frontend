import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Icon, Divider } from 'semantic-ui-react';
import { ADD_USER_TO_TEMP_PROJECT, UPDATE_PROJECT, UPDATE_USER, REMOVE_USER_FROM_TEMP_PROJECT } from '../store/type';
import { addUserProject } from '../api';
import MissingAsset from './MissingAsset';
import '../resources/AddUsersTable.css';

const AddUsersTable = props => {

  const users = useSelector(state => state.user.users)
  const projectId = parseInt(props.match.url.split("/")[2])
  const addUsersId = useSelector(state => state.project.addUsersId)
  const dispatch = useDispatch()

  const fullName = (firstName, lastName) => {
    return `${firstName} ${lastName}`
  }

  // return the users based on the page selected
  const currentlyAvailable = () => {
    return props.userType === "newProject" ? availableUsers(users) : notOnCurrentProject(users)
  }

  const availableUsers = data => {
    return data.filter(user => user.available)
  }
  
  // filter out all the users that are working at the selected project
  const notOnCurrentProject = data => {
    const available = []
    for (let user of data) {
      const projectIds = []
      for (let pro of user.projects) { 
        projectIds.push(pro.id)
      } 
      if (!projectIds.includes(projectId)) {
        available.push(user)  
      }
    }
    return available
  }

  const handleClick = userId => {
    // find elements
    const button = document.getElementById(`Assign-User-${userId}`)
    const icon = document.getElementById(`Assign-Button-${userId}`)
    if (!addUsersId.includes(userId)) {
      dispatch({ type: ADD_USER_TO_TEMP_PROJECT, payload: userId })
      // change button and icon
      button.className += " Selected"
      icon.classList.remove("user")
      icon.className += " check"
    } else {
      const filteredIds = addUsersId.filter(id => id !== userId)
      dispatch({ type: REMOVE_USER_FROM_TEMP_PROJECT, payload: filteredIds })
      // change button and icon back
      button.classList.remove("Selected")
      icon.classList.remove("check")
      icon.className += " user"
    }
  }

  const addCollaborators = () => {
    props.setOpen(false)
    const updateProject = {
      users: addUsersId,
      projectId: props.currentProject.id
    }
    addUserProject(updateProject)
    .then(data => {
      // set selected user ids back to an empty array 
      dispatch({ type: REMOVE_USER_FROM_TEMP_PROJECT, payload: [] })
      // pass updated project with new users to the redux store for updating
      dispatch({ type: UPDATE_PROJECT, payload: data.project })
      // pass each updated user to the redux store for updating
      for (let user of data.users) {
        dispatch({ type: UPDATE_USER, payload: user })
      }
    })
  }

  const renderCollaborators = () => {
     return currentlyAvailable().map(user => (
      user.available &&
        (
          <Table.Row key={user.id}>
            <Table.Cell>{fullName(user.first_name, user.last_name)}</Table.Cell>
            <Table.Cell>{user.job_title}</Table.Cell>
            <Table.Cell>
              <Button
                type="button"
                labelPosition='left'
                size='small'
                icon
                id={`Assign-User-${user.id}`}
                className="AddUsersTable-Button-Color"
                onClick={() => handleClick(user.id)}
              >
                <Icon name="user" id={`Assign-Button-${user.id}`}/> 
                  Assign
              </Button>
            </Table.Cell>
          </Table.Row>
        )
     ))
  }

  // console.log("ADD USERS TABLE:", currentlyAvailable())

  return (
    <>
      <div id="AddUsersTable-Container">
        {
          currentlyAvailable().length !== 0 ?
            (
              <React.Fragment>
                <Table columns={3}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Job Title</Table.HeaderCell>
                      <Table.HeaderCell>Add collaborator</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                    <Table.Body> 
                      {renderCollaborators()}
                    </Table.Body>
                </Table>
                <Divider/>
                { props.button ?
                  <Button type="submit" className="NewProject-Submit-Button-Color">Create</Button>
                  :
                  (
                    <>
                      <Button className="NewProject-Submit-Button-Color" onClick={addCollaborators}>Add</Button>
                      <Button onClick={() => props.setOpen(false)}>Cancel</Button>
                    </>
                  )
                }
              </React.Fragment>
            ) : 
            (
              <MissingAsset message={"All users seem to be currently unavailable"} icon={"user times"} />
            )
        }
      </div>
    </>
  );
};

export default withRouter(AddUsersTable);
