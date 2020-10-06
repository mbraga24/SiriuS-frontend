import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, Button } from 'semantic-ui-react';
import { completeProject, deleteProject } from '../api';
import { ADD_COMPLETE_PROJECT, REMOVE_ACTIVE_PROJECT, UPDATE_PROJECT, UPDATE_USER, REMOVE_COMPLETE_PROJECT } from '../store/type';

const Project = props => {

  const { id, name, start_date, due_date } = props.project
  const dispatch = useDispatch()

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
      // update each user in the redux store
      for (let user of data.users) {
        dispatch({ type: UPDATE_USER, payload: user })
      }
      // update projects from the redux store
      dispatch({ type: REMOVE_COMPLETE_PROJECT, payload: data.projectId })
    })
  }

  console.log("LINK ---> ", props.linkTo)

//  active project 
//   buttons - Done 
//           - Details
//   button Class - ViewProjects-Button-Color
//   Link - '/project/${id}'

  return (
    <List.Item className={props.listClass}>
      <List.Icon name='puzzle' size='large' verticalAlign='middle' className="ViewProjects-Icon-Color" />
      <List.Content>
        <List.Content floated='right'>
          <Button className={`${props.btnClass}`} onClick={props.active ? handleComplete : handleDelete}>{props.btnName}</Button>
        </List.Content>
        <List.Content floated='right'>
          <Link to={`/project/${id}`}>
            <Button className="ViewProjects-Button-Color">Details</Button>
          </Link>
        </List.Content>
          <Link to={`${props.linkTo}${id}`}>
            <List.Header as='a' className="ViewProjects-Project-Name">{name}</List.Header>
          </Link>
        <List.Description as='a'className="ViewProjects-Project-Date">Start date: {start_date} | Due date: {due_date}</List.Description>
      </List.Content>
    </List.Item>
  )
}

export default Project;