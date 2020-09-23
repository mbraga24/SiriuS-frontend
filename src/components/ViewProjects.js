import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon, Container, List, Divider, Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import Project from './Project';
import CompleteProject from './CompleteProject';
import '../resources/ViewProjects.css';

const ViewProjects = () => {

  const projects = useSelector(state => state.project.projects)
  const completedProjects = useSelector(state => state.completeProject.complete)

  const renderProjects = () => {
    return projects.map(project => (
      <Project key={project.id} project={project} />
    ))
  }

  const renderCompleteProjects = () => {
    return completedProjects.map(project => (
      <CompleteProject key={project.id} project={project} />
    ))
  }
  
  return (
    <>
      <Container id="ViewProjects-Container">
        <Header as='h2' className="ViewProjects-Header-Align-Items">
          <span>
            <Icon name='clipboard list' size="large" className="ViewProjects-Icon-Color"/>
            <Header.Content>
              <span className="ViewProjects-Title">Projects</span>
            </Header.Content>
          </span>
          <span>
            <Link to="/projects/new">
              <Button className="ViewProjects-Button-Create-Project">
                <Icon name='add' /> 
                New Project
              </Button>
            </Link>
          </span>
        </Header>
        <List divided relaxed size="large">
          { projects ? renderProjects() :  <h1>No New Projects</h1> }
        </List>
        <Divider/>
        <Header as='h2' className="ViewProjects-Header-Align-Items">
            <span>
              <Icon name='clipboard check' size="large" className="ViewProjects-Icon-Color"/>
              <Header.Content>
                <span className="ViewProjects-Title">Concluded</span>
              </Header.Content>
            </span>
            <span>
              <Link to="/projects/new">
                <Button className="ViewProjects-Button-Create-Project">
                  <Icon name='trash' /> 
                  Clear List
                </Button>
              </Link>
            </span>
          </Header>
          <List divided relaxed size="large">
            { completedProjects ? renderCompleteProjects() : <h1>No Finished Projects</h1> }
          </List>
      </Container>
    </>
  )
}

export default ViewProjects;