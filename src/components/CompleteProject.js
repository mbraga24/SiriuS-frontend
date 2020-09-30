import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, Button } from 'semantic-ui-react';
import { deleteProject } from '../api';
import { UPDATE_USER, UPDATE_COMPLETE_LIST } from '../store/type';

const CompleteProject = props => {
  
  const dispatch = useDispatch()
  const { id, name, start_date, due_date } = props.project
  
  const handleDelete = () => {
    deleteProject(id)
    .then(data => {
      // update each user in the redux store
      for (let user of data.users) {
        dispatch({ type: UPDATE_USER, payload: user })
      }
      // update projects from the redux store
      dispatch({ type: UPDATE_COMPLETE_LIST, payload: data.project })
    })
  }

  return  (
    <List.Item className="ViewProjects-List-Item-Complete">
      <List.Icon name='checkmark' size='large' verticalAlign='middle' className="ViewProjects-Icon-Color" />
      <List.Content>
        <List.Content floated='right'>
            <Button className="ViewProjects-Button-Color-Delete" onClick={handleDelete}>Delete</Button>        
        </List.Content>
        <List.Content floated='right'>
          <Link to={`/project/done/${id}`}>
            <Button className="ViewProjects-Button-Color">Details</Button>
          </Link>
        </List.Content>
        <Link to={`/project/done/${id}`}>
          <List.Header as='a' className="ViewProjects-Project-Name">{name}</List.Header>
        </Link>
        <List.Description as='a'className="ViewProjects-Project-Date">Start date: {start_date} | Due date: {due_date}</List.Description>
      </List.Content>
    </List.Item>
  )
}

export default CompleteProject;

