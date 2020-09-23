import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Icon, Container, List, Button } from 'semantic-ui-react';
import CompleteProject from './CompleteProject';

const CompleteProjectList = () => {

  const projects = useSelector(state => state.completeProject.complete)

  const renderCompleteProjects = () => {
    return projects.map(project => (
      <CompleteProject key={project.id} project={project} />
    ))
  }

  return (
      <>
        <Container id="ViewProjects-Container">
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
            { projects ? renderCompleteProjects() : <h1>No Finished Projects</h1> }
          </List>
        </Container>
      </>
  )
}

export default CompleteProjectList;