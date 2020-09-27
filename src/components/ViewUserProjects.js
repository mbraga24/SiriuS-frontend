import React from 'react';
import { withRouter } from 'react-router-dom';
import { Header, Icon, Container, List, Divider, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
// import DocumentList from './DocumentList';
import { removeProjectFromUser } from '../api';
import { UPDATE_USER } from '../store/type';
import '../resources/ViewUserProjects.css';

const ViewUserProjects = (props) => {
  
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
    .then(updateUser => {
      dispatch({ type: UPDATE_USER, payload: updateUser })
    })
  }

  const renderProjects = () => {
    return thisUser.projects.map(project => (
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
                <span className="ViewUserProjects-Title">{thisUser.first_name} {thisUser.last_name}'s Project History</span>
              </Header.Content>
            </span>
          </Header>
          <Divider/>
          <List divided relaxed size="large">
            { projects && renderProjects() }
          </List>
          {/* <DocumentList  /> */}
        </>
      }
    </Container>
    </>
  )
}

export default withRouter(ViewUserProjects);