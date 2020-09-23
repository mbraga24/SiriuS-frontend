import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, Button } from 'semantic-ui-react';
import { completeProject } from '../api';
import { ADD_COMPLETE_PROJECT, REMOVE_PROJECT } from '../store/type';

const Project = props => {

  const { id, name, start_date, due_date } = props.project
  const dispatch = useDispatch()

  const complete = () => {
    completeProject(id)
    .then(completed => {
      console.log("CLICK TO ADD COMPLETE PROJECT:", completed)
      // =======================================================
      // NOT SURE IF IT'S WORKING -----
      // =======================================================
      dispatch({ type: ADD_COMPLETE_PROJECT, payload: completed })
      dispatch({ type: REMOVE_PROJECT, payload: completed })
    })
  }

  
  return (
    <List.Item className="ViewProjects-List-Item">
      <List.Icon name='puzzle' size='large' verticalAlign='middle' className="ViewProjects-Icon-Color" />
      <List.Content>
        <List.Content floated='right'>
          <Button className="ViewProjects-Button-Color" onClick={complete}>Done</Button>
        </List.Content>
        <List.Content floated='right'>
          <Link to={`/project/${id}`}>
            <Button className="ViewProjects-Button-Color">Details</Button>
          </Link>
        </List.Content>
          <Link to={`/project/${id}`}>
            <List.Header as='a' className="ViewProjects-Project-Name">{name}</List.Header>
          </Link>
        <List.Description as='a'className="ViewProjects-Project-Date">Start date: {start_date} | Due date: {due_date}</List.Description>
      </List.Content>
    </List.Item>
  )
}

export default Project;