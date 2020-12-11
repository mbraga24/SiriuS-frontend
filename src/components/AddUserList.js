import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Icon, Divider, Form } from 'semantic-ui-react';
import { ADD_USER_TO_TEMP_PROJECT, UPDATE_PROJECT, UPDATE_USER, REMOVE_USER_FROM_TEMP_PROJECT } from '../store/type';
import { availableUsers, fullName } from '../helpers/userHelpers';
import { addUserProject } from '../api';
import MissingAsset from './MissingAsset';
import '../resources/AddUserList.css';

const AddUserList = ( { defaultActions = true, relaunchProject = true, ...props } ) => {

  const users = useSelector(state => state.user.users)
  const projectId = parseInt(props.match.url.split("/")[2])
  const addUsersId = useSelector(state => state.activeProject.addUsersId)
  const [ collaboratorsToDisplay, setCollaboratorsToDisplay ] = useState([])
  const dispatch = useDispatch()

  const handleClick = userId => {
    // find elements 
    const button = document.getElementById(`Assign-User-${userId}`)
    const icon = document.getElementById(`Assign-Button-${userId}`)
    if (!addUsersId.includes(userId)) {
      dispatch({ type: ADD_USER_TO_TEMP_PROJECT, payload: userId })
      // change button and icon
      button.className += " Selected Selected-Change"
      button.classList.remove("Button-Change")
      icon.classList.remove("user")
      icon.className += " check"
    } else {
      const filteredIds = addUsersId.filter(id => id !== userId)
      dispatch({ type: REMOVE_USER_FROM_TEMP_PROJECT, payload: filteredIds })
      // change button and icon back
      button.className += " Button-Change"
      button.classList.remove("Selected")
      button.classList.remove("Selected-Change")
      icon.classList.remove("check")
      icon.className += " user"
    }
  }
  
  // filter out all the users that are working at the selected project
  const notOnCurrentProject = useCallback((dataUsers) => {
    const availableForThisProject = []
    for (let user of dataUsers) {
      const projectIds = []
      for (let pro of user.projects) { 
        projectIds.push(pro.id)
      } 
      if (!projectIds.includes(projectId)) {
        availableForThisProject.push(user)  
      }
    }
    return availableForThisProject
  }, [projectId])

  // return the users based on the page selected
  useEffect(() => {
    if (props.userType === "newProject") {
      setCollaboratorsToDisplay(availableUsers(users))
    } 
    if (props.userType === "currentProject") {
      let userList = notOnCurrentProject(users)
      setCollaboratorsToDisplay(availableUsers(userList))
    }
    if (props.userType === "relaunchProject") {
      setCollaboratorsToDisplay(availableUsers(users))
    }
  }, [dispatch, props.userType, users, notOnCurrentProject])

  const addCollaborators = () => {
    props.setOpen(false)
    const updateProject = {
      users: addUsersId,
      projectId: projectId
    }
    addUserProject(updateProject)
    .then(data => {
      dispatch({ type: REMOVE_USER_FROM_TEMP_PROJECT, payload: [] }) // set selected user ids back to an empty array 
      dispatch({ type: UPDATE_PROJECT, payload: data.project })
      for (let user of data.users) {
        dispatch({ type: UPDATE_USER, payload: user })
      }
    })
  }

  const renderCollaborators = () => {
     return collaboratorsToDisplay.map(user => (
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
              className="AddUserList-Button-Color Button-Color"
              onClick={() => handleClick(user.id)} >
              <Icon name="user" id={`Assign-Button-${user.id}`}/> 
                Assign
            </Button>
          </Table.Cell>
        </Table.Row>
     ))
  }

  return (
      <div id="AddUserList-Container">
        {
          collaboratorsToDisplay.length !== 0 ?
          <React.Fragment>
            <Form.Field className="NewProject-User-Choice-Wrapper">
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
            </Form.Field>
              { 
                defaultActions && 
                <React.Fragment>
                  {
                    props.button && 
                    <>
                      <Divider />
                      <Form.Field className="Button-Form-Action">
                        <Button floated="right" onClick={addCollaborators} className="Button-Color">Add</Button>
                        <Button floated="right" onClick={() => props.setOpen(false)} className="Button-Color">Cancel</Button>
                      </Form.Field>
                    </>
                  }
                </React.Fragment>
              }
          </React.Fragment>
           :
          <MissingAsset message={props.userType === "newProject" ? "All users seem to be currently unavailable" : "There no users available to work this project"} icon={"user times"} />
        }
      </div>
  );
};

export default withRouter(AddUserList);
