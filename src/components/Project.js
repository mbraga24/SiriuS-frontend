import React from 'react';
import { Header, Icon, Container, Divider, Button } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import AddUsersTable from './AddUsersTable';
import '../resources/Project.css';
// import { getProjects } from '../api';

const Project = (props) => {

  const projects = useSelector(state => state.project.projects)
  const matchId = parseInt(props.match.params.id)
  const thisProject = projects.find(pro => pro.id === matchId)

console.log(projects)
  return (
    <React.Fragment>
      { 
        thisProject && 
        <Container>
          <Header as='h2' className="Projects-Header-Align-Items">
          <span>
            <Icon name='clipboard list' size="large" className="Projects-Icon-Color"/>
            <Header.Content>
              <span className="Projects-Title">Project: {thisProject.name}</span>
            </Header.Content>
          </span>
          <span>
            <Link to="/">
              <Button className="Projects-Button-Create-Project">
                <Icon name='add' /> 
                Add Collaborator
              </Button>
            </Link>
          </span>
        </Header>
        <Divider/>
        <AddUsersTable/>

        </Container>
      }
    </React.Fragment>
  )
}

export default withRouter(Project);