import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Header, Icon, List, Button, Modal } from 'semantic-ui-react';
import { removeProjectFromUser } from '../api';
import { UPDATE_USER, UPDATE_PROJECT } from '../store/type';
import Loading from './Loading';
import MissingAsset from './MissingAsset';
import '../resources/UserHistory.css';

const UserProjects = props => { 

  const dispatch = useDispatch()

  const keyHolder = useSelector(state => state.app.keyHolder)
  const matchId = parseInt(props.match.params.id)
  const projects = useSelector(state => state.project.projects)
  const users = useSelector(state => state.user.users)
  const [ loadUsers, setLoadUsers ] = useState(true)
  const [ loadProjecst, setLoadProjects ] = useState(true)
  const [ viewer, setViewer ] = useState(null)
  const [ open, setOpen ] = useState(false)

  useEffect(() => {
    setLoadUsers(!users)
    setLoadProjects(!projects)
    const u = users.find(user => user.id === matchId)
    setViewer(u)
  }, [loadUsers, users, viewer, projects, matchId])

  const userProjects = () => {
    return projects.filter(project => project.users.find(user => user.id === matchId) && project)
  }

  const removeProject = (userId, projectId) => {
    removeProjectFromUser(userId, projectId)
    .then(data => {
      dispatch({ type: UPDATE_USER, payload: data.user }) 
      dispatch({ type: UPDATE_PROJECT, payload: data.project }) 
    })
  }

  const renderProjects = () => {
    return userProjects().map(project => (
      <List.Item key={project.id} className="UserHistory-List-Item">
        <List.Icon name={`${project.done ? "check circle" : "puzzle piece"}`} size='large' verticalAlign='middle' className="UserHistory-Icon-Color" />
        <List.Content>
          { keyHolder.admin && 
            <List.Content floated='right'>
              <Modal
                closeIcon
                size="tiny"
                open={open}
                trigger={ 
                  <Button className="UserHistory-Button-Color">Remove Project</Button>
                }
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
              >
                <Header icon="trash" content='Please confirm:' />
                <Modal.Content>
                  <p>
                    Are you sure you want to cancel this collaborator's project?
                  </p>
                </Modal.Content>
                <Modal.Actions>
                  <Button color='red' onClick={() => setOpen(false)}>
                    <Icon name='remove' /> No
                  </Button>
                  <Button color='green' onClick={() => removeProject(viewer.id, project.id)}>
                    <Icon name='checkmark' /> Yes
                  </Button>
                </Modal.Actions>
              </Modal>
            </List.Content>
          }
          <List.Header as={Link} to={`/project/${project.id}`} className="UserHistory-Project-Name">{project.name}</List.Header>
          <List.Description as='a'className="UserHistory-Project-Date">Start date: {project.start_date} | Due date: {project.due_date}</List.Description>
        </List.Content>
      </List.Item>
    ))
  }

  return (
      <React.Fragment>
        <List divided relaxed>
        <Header as='h2' className="UserHistory-Header-Align-Items">
          <span>
            <Icon name='user' size="large" className="UserHistory-Icon-Color"/>
            <Header.Content>
              {
                loadUsers ?
                "" :
                <span className="UserHistory-Title">{ keyHolder.admin && viewer ? `${viewer.first_name} ${viewer.last_name}` : "Your Projects"}</span>
              }
            </Header.Content>
          </span>
        </Header> 
        { loadProjecst ? <Loading loadingClass={false} /> : renderProjects().length !== 0 ? renderProjects() : <MissingAsset message={"No projects assigned"} icon={"puzzle piece"} /> }
        </List>
      </React.Fragment>
    )
}

export default withRouter(UserProjects);