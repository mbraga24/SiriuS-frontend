import React from 'react';
import { withRouter } from 'react-router-dom';
import { Header, Icon, Container, List, Divider, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { removeProjectFromUser } from '../api';
import { UPDATE_USER, UPDATE_ACTIVE_PROJECT, UPDATE_PROJECT } from '../store/type';
import '../resources/ViewUserProjects.css';
import DocumentList from './DocumentList';
import MissingAsset from './MissingAsset';

const UserHistory = (props) => {
  
  const projects = useSelector(state => state.project.projects)
  const users = useSelector(state => state.user.users)
  const dispatch = useDispatch()
  
  // find the user for this page
  const userPage = userId => {
    return users.find(user => user.id.toString() === userId )
  }

  // assign user object to thisUser variable
  const thisUser = userPage(props.match.params.id)

  const removeProject = (userId, projectId) => {
    removeProjectFromUser(userId, projectId)
    .then(data => {
      console.log(data)
      dispatch({ type: UPDATE_USER, payload: data.user }) 
      dispatch({ type: UPDATE_ACTIVE_PROJECT, payload: data.project }) 
      dispatch({ type: UPDATE_PROJECT, payload: data.project }) 
    })
  }

  // filter current active user's projects
  const filteredProjects = () => {
    const userProjects = []
    projects.map(project => thisUser.projects.map(pro => (project.id === pro.id) && userProjects.push(project)))
    return userProjects
  }

  const renderProjects = () => {
    return filteredProjects() && filteredProjects().map(project => (
      <List.Item key={project.id} className="ViewUserProjects-List-Item">
        <List.Icon name='puzzle' size='large' verticalAlign='middle' className="ViewUserProjects-Icon-Color" />
        <List.Content>
          <List.Content floated='right'>
            <Button className="ViewUserProjects-Button-Color" onClick={() => removeProject(thisUser.id, project.id)}>Remove Project</Button>
          </List.Content>
          <List.Header as='a' className="ViewUserProjects-Project-Name">{project.name}</List.Header>
          <List.Description as='a'className="ViewUserProjects-Project-Date">Start date: {project.start_date} | Due date: {project.due_date}</List.Description>
        </List.Content>
      </List.Item>
    ))
  }
  
  return (
    <>
    <Container id="ViewUserProjects-Container">
      {
        thisUser && 
        <>
          <Header as='h2' className="ViewUserProjects-Header-Align-Items">
            <span>
              <Icon name='user' size="large" className="ViewUserProjects-Icon-Color"/>
              <Header.Content>
                <span className="ViewUserProjects-Title">History: {thisUser.first_name} {thisUser.last_name}</span>
              </Header.Content>
            </span>
          </Header>
          <Divider/>
          <List divided relaxed>
          { renderProjects().length !== 0 ? renderProjects() : <MissingAsset message={"Assign this user their first project"} icon={"puzzle piece"} /> }
          </List>
          <DocumentList message={"No documents are listed for this user"} icon={"pdf file outline"} />
        </>
      }
    </Container>
    </>
  )
}

export default withRouter(UserHistory);