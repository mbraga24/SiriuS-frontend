import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, Button, Modal, Header, Icon } from 'semantic-ui-react';
import { completeProject, archiveProject, deleteFromArchive } from '../api';
import { ADD_TO_ARCHIVE, REMOVE_FROM_ARCHIVE, REMOVE_PROJECT, UPDATE_USER } from '../store/type';

const ProjectOption = props => {

  const dispatch = useDispatch()
  const { id, name, start_date, due_date } = props.project
  const keyHolder = useSelector(state => state.app.keyHolder) 
  const [ open, setOpen ] = useState(false)

  // add project to the complete project list
  const handleComplete = () => {
    completeProject(id)
    .then(data => {
        console.log("COMPLETED PROJECT RETURNED", data);
        const { users, project } = data
        dispatch({ type: REMOVE_PROJECT, payload: project })
        // dispatch({ type: ADD_COMPLETE_PROJECT, payload: project })
        // dispatch({ type: REMOVE_ACTIVE_PROJECT, payload: project })
        // update each user in the redux store
        for (let user of users) {
          dispatch({ type: UPDATE_USER, payload: user })
        }
        return project;
    })
    .then(async arqProject => {
      return archiveProject(arqProject)
        .then(data => {
          const { archived_project } = data
          console.log("ARCHIVED PROJECT DATA", data)
          dispatch({ type: ADD_TO_ARCHIVE, payload: archived_project})
        })
    });
  }

  const handleDelete = () => {
    deleteFromArchive(id)
    .then(data => {
      console.log("PROJECT DELETED -->", data)
      // update projects from the redux store
      dispatch({ type: REMOVE_FROM_ARCHIVE, payload: data.projectId })
      setOpen(false)
    })
  }

  return (
    <List.Item className={props.listClass}>
      <List.Icon name={props.icon} size='large' verticalAlign='middle' className="ProjectList-Icon-Color" />
      <List.Content>
        { keyHolder.admin ?
          <List.Content floated='right'>
               <Modal
                closeIcon
                size="tiny"
                open={open}
                trigger={<Button className={`${props.btnClass}`}>{props.btnName}</Button>}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
              >
                <Header icon={props.active ? "calendar check" : "trash"} content='Please confirm' />
                <Modal.Content>
                  {
                    props.active ?
                    <p>
                      You're about to close all activities for this project. Collaborators will no longer be able to share new documents.
                    </p>
                    :
                    <p>
                      Are you sure you want to delete this project? You will no longer have access to this project's details. 
                    </p>
                  }
                </Modal.Content>
                <Modal.Actions>
                  <Button color='red' onClick={() => setOpen(false)}>
                    <Icon name='remove' /> No
                  </Button>
                  <Button color='green' onClick={props.active ? handleComplete : handleDelete}>
                    <Icon name='checkmark' /> Yes
                  </Button>
                </Modal.Actions>
              </Modal>
          </List.Content>
          : null
        } 
        <List.Content floated='right'>
          <Button as={Link} to={`${props.linkToDetails}${id}`} className="ProjectList-Button-Color Change-Invert">Details</Button>
        </List.Content>
          <List.Header as={Link} to={`${props.linkToDetails}${id}`} className="ProjectList-Project-Name">{name}</List.Header>
        <List.Description as='a'className="ProjectList-Project-Date">Start date: {start_date} | Due date: {due_date}</List.Description>
      </List.Content>
    </List.Item>
  )
}

export default ProjectOption;