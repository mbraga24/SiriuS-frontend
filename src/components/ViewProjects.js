import React from 'react';
import { Container, List, Divider } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import Project from './Project';
import CompleteProject from './CompleteProject';
import ProjectHeader from './ProjectHeader';
import MissingAsset from './MissingAsset';
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
          { projects.length !== 0 ? renderProjects() : <MissingAsset message={"There are no projects pending at the moment"} icon={"coffee"} /> }
        </List>
        <Divider/>
        <ProjectHeader title={"Done"} button={"Clear List"} clear={true} iconButton={"trash"} iconHeader={"archive"} />
        <List divided relaxed size="large">
          { completedProjects.length !== 0 ? renderCompleteProjects() : <MissingAsset message={"There are no past projects at the moment"} icon={"folder open outline"} /> }
        </List>
      </Container>
    </>
  )
}

export default ViewProjects;