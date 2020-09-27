import React from 'react';
import { Container, List, Divider } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import Project from './Project';
import CompleteProject from './CompleteProject';
import ProjectHeader from './ProjectHeader';
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
        <ProjectHeader title={"Projects"} button={"New Project"} newProject={"/projects/new"} iconButton={"add"} iconHeader={"clipboard list"} />
        <List divided relaxed size="large">
          { projects ? renderProjects() :  <h1>No New Projects</h1> }
        </List>
        <Divider/>
        <ProjectHeader title={"Done"} button={"Clear List"} clear={true} iconButton={"trash"} iconHeader={"archive"} />
        <List divided relaxed size="large">
          { completedProjects ? renderCompleteProjects() : <h1>No Finished Projects</h1> }
        </List>
      </Container>
    </>
  )
}

export default ViewProjects;