import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, Button } from 'semantic-ui-react';
import { completeProject } from '../api';
import { ADD_COMPLETE_PROJECT, REMOVE_PROJECT } from '../store/type';

const Project = props => {

  const { id, name, start_date, due_date } = props.project
  const dispatch = useDispatch()

  // add project to the complete project list
  const handleComplete = () => {
    completeProject(id)
    .then(data => {
      dispatch({ type: ADD_COMPLETE_PROJECT, payload: data.project })
      dispatch({ type: REMOVE_PROJECT, payload: data.project })
    })
  }

  return (
    <List.Item className="ViewProjects-List-Item">
      <List.Icon name='puzzle' size='large' verticalAlign='middle' className="ViewProjects-Icon-Color" />
      <List.Content>
        <List.Content floated='right'>
          <Button className="ViewProjects-Button-Color" onClick={handleComplete}>Done</Button>
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