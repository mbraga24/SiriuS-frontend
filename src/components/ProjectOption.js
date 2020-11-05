import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, Button, Modal, Header, Icon } from 'semantic-ui-react';
import { completeProject, deleteProject } from '../api';
import { ADD_COMPLETE_PROJECT, REMOVE_ACTIVE_PROJECT, UPDATE_PROJECT, UPDATE_USER, REMOVE_COMPLETE_PROJECT } from '../store/type';

const ProjectOption = props => {

  const dispatch = useDispatch()
  const { id, name, start_date, due_date } = props.project
  const keyHolder = useSelector(state => state.app.keyHolder) 
  const [ open, setOpen ] = useState(false)

  // add project to the complete project list
  const handleComplete = () => {
    completeProject(id)
    .then(data => {
      dispatch({ type: UPDATE_PROJECT, payload: data.project })
      dispatch({ type: ADD_COMPLETE_PROJECT, payload: data.project })
      dispatch({ type: REMOVE_ACTIVE_PROJECT, payload: data.project })
    })
  }

  const handleDelete = () => {
    deleteProject(id)
    .then(data => {
      // update projects from the redux store
      dispatch({ type: REMOVE_COMPLETE_PROJECT, payload: data.projectId })
      // update each user in the redux store
      for (let user of data.users) {
        dispatch({ type: UPDATE_USER, payload: user })
      }
      setOpen(false)
    })
  }

  return (
    <List.Item className={props.listClass} id="TEST">
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
          <Link to={`/project/${id}`}>
            <Button className="ProjectList-Button-Color Change-Invert">Details</Button>
          </Link>
        </List.Content>
          <Link to={`/project/${id}`}>
            <List.Header as='a' className="ProjectList-Project-Name">{name}</List.Header>
          </Link>
        <List.Description as='a'className="ProjectList-Project-Date">Start date: {start_date} | Due date: {due_date}</List.Description>
      </List.Content>
    </List.Item>
  )
}

export default ProjectOption;