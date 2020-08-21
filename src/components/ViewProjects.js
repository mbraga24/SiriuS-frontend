import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon, Container, List, Divider, Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import '../resources/ViewProjects.css';

const ViewProjects = () => {

  const projects = useSelector(state => state.project.projects)

  const displayProjects = () => {
    return projects.map(project => (
      <List.Item key={project.id} className="ViewProjects-List-Item">
        <List.Icon name='puzzle' size='large' verticalAlign='middle' className="ViewProjects-Icon-Color" />
        <List.Content>
          <List.Content floated='right'>
            <Button className="ViewProjects-Button-Color">Done</Button>
          </List.Content>
          <List.Content floated='right'>
            <Button className="ViewProjects-Button-Color">Details</Button>
          </List.Content>
          <List.Header as='a' className="ViewProjects-Project-Name">{project.name}</List.Header>
          <List.Description as='a'className="ViewProjects-Project-Date">Start date: {project.start_date} | Due date: {project.due_date}</List.Description>
        </List.Content>
      </List.Item>
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
      <Divider/>
      <List divided relaxed size="large">
        { projects && displayProjects() }
      </List>
      
    </Container>
    </>
  )
}

export default ViewProjects;