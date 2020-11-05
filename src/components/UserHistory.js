import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Header, Icon, List, Divider, Button, Loader } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { removeProjectFromUser } from '../api';
import { UPDATE_USER, UPDATE_ACTIVE_PROJECT, UPDATE_PROJECT } from '../store/type';
import DocumentList from './DocumentList';
import MissingAsset from './MissingAsset';
import '../resources/UserHistory.css';

const UserHistory = (props) => {
  
  let currentUser;
  const keyHolder = useSelector(state => state.app.keyHolder)
  const projects = useSelector(state => state.project.projects)
  const loadProjects = useSelector(state => state.load.loadProjects) 
  const users = useSelector(state => state.user.users)
  const dispatch = useDispatch()

  // find the user for this page
  const userPage = userId => {
    return users.find(user => user.id.toString() === userId )
  }

  // conditional statement - 
  // if - the user viewing the page is not the admin assign the keyHolder to currentUser variable
  // else - collect the id from the URL, find the respective user and assign user to currentUser variable
  if (!keyHolder.admin) {
    currentUser = keyHolder 
  } else {
    // assign user object to currentUser variable
    currentUser = userPage(props.match.params.id)
  }

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
    projects.map(project => currentUser.projects.map(pro => (project.id === pro.id) && userProjects.push(project)))
    return userProjects
  }

  const renderProjects = () => {
    return filteredProjects().map(project => (
      <List.Item key={project.id} className={`UserHistory-List-Item ${project.done && "Complete-Project"}`}>
        <List.Icon name={`${project.done ? "check circle" : "puzzle piece"}`} size='large' verticalAlign='middle' className="UserHistory-Icon-Color" />
        <List.Content>
          { keyHolder.admin && 
            <List.Content floated='right'>
              <Button className="UserHistory-Button-Color" onClick={() => removeProject(currentUser.id, project.id)}>Remove Project</Button>
            </List.Content>
          }
          <Link to={`/project/${project.id}`}>
            <List.Header as='a' className="UserHistory-Project-Name">{project.name}</List.Header>
          </Link>
          <List.Description as='a'className="UserHistory-Project-Date">Start date: {project.start_date} | Due date: {project.due_date}</List.Description>
        </List.Content>
      </List.Item>
    ))
  }
  
  return (
    <div id="UserHistory-Container">
      {
        currentUser && 
        <React.Fragment>
          <Header as='h2' className="UserHistory-Header-Align-Items">
            <span>
              <Icon name='user' size="large" className="UserHistory-Icon-Color"/>
              <Header.Content>
                <span className="UserHistory-Title">{currentUser.first_name} {currentUser.last_name}</span>
              </Header.Content>
            </span>
          </Header>
          <Divider/>
          <List divided relaxed>
          { loadProjects ? <Loader active inline='centered' /> : renderProjects().length !== 0 ? renderProjects() : <MissingAsset message={"Assign First Project"} icon={"puzzle piece"} /> }
          </List>
          <DocumentList message={"No documents"} icon={"pdf file outline"} />
        </React.Fragment>
      }
    </div>
  )
}

export default withRouter(UserHistory);