import React from 'react';
import { Container, List, Divider } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import Project from './Project';
import CompleteProject from './CompleteProject';
import ProjectHeader from './ProjectHeader';
import MissingAsset from './MissingAsset';
import '../resources/ViewProjects.css';

const ViewProjects = () => {

  const activeProjects = useSelector(state => state.activeProject.active)
  const completedProjects = useSelector(state => state.completeProject.complete)

  const renderActiveProjects = () => {
    return activeProjects.map(project => (
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
        <ProjectHeader title={"Projects"} buttonName={"New Project"} action={"new"} newProject={"/projects/new"} iconButton={"add"} iconHeader={"clipboard list"} />
        <List divided relaxed size="large">
          { activeProjects.length !== 0 ? renderActiveProjects() : <MissingAsset message={"There are no projects pending at the moment"} icon={"coffee"} /> }
        </List>
        <Divider/>
        <ProjectHeader title={"Arquive"} action={"none"} iconHeader={"archive"} />
        <List divided relaxed size="large">
          { completedProjects.length !== 0 ? renderCompleteProjects() : <MissingAsset message={"There are no projects archived"} icon={"folder open outline"} /> }
        </List>
      </Container>
    </>
  )
}

export default ViewProjects;