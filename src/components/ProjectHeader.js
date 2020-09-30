import React from 'react';
import { UPDATE_USER, CLEAR_COMPLETE_PROJECTS } from '../store/type';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { clearProjectList } from '../api';

const ProjectHeader = props => {

  const dispatch = useDispatch()
  
  const clearList = () => {
    clearProjectList()
    .then(data => {
      // console.log("RETURNED AVAILABLE USERS:", data.available_users)
      // update each user in the redux store
      for (let user of data.available_users) {
        dispatch({ type: UPDATE_USER, payload: user })
      }
      // update projects from the redux store
      dispatch({ type: CLEAR_COMPLETE_PROJECTS })
    })
  }

  return (
    <Header as='h2' className="ViewProjects-Header-Align-Items">
      <span>
        <Icon name={props.iconHeader} size="large" className="ViewProjects-Icon-Color"/>
        <Header.Content>
          <span className="ViewProjects-Title">{props.title}</span>
        </Header.Content>
      </span>
      <span>
        <Link to={!props.clear && `${props.newProject}`}>
          <Button 
            className="ViewProjects-Button-Create-Project"
            onClick={props.clear && clearList} >
            <Icon name={props.iconButton} /> 
            {props.button}
          </Button>
        </Link>
      </span>
    </Header>
  );
}

export default ProjectHeader;