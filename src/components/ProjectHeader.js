import React from 'react';
import { SET_USERS, CLEAR_COMPLETE_PROJECTS } from '../store/type';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { clearProjectList } from '../api';

const ProjectHeader = props => {

  const users = useSelector(state => state.user.users)
  const dispatch = useDispatch()

  // update users available state =======> FUTURE HELPER <======= 
  const updateUsers = userProjects => {
    for (let user of userProjects) {
      const filteredUsers = users.map(userMap => { 
        if (userMap.id === user.id) {
          return user
        } else {
          return userMap
        }
      })
      // set users state with the updatedUsers
      dispatch({ type: SET_USERS, payload: filteredUsers })
    }
  }

  const clearList = () => {
    clearProjectList()
    .then(data => {
      // update users available state
      updateUsers(data.available_users)
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