import React from 'react';
import { Container, List, Divider } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import Project from './Project';
import ProjectHeader from './ProjectHeader';
import MissingAsset from './MissingAsset';
import '../resources/ViewProjects.css';

const ProjectsView = () => {

  const keyHolder = useSelector(state => state.app.keyHolder)
  const activeProjects = useSelector(state => state.activeProject.active)
  const completeProjects = useSelector(state => state.completeProject.complete)

  const renderActive = () => {
    return activeProjects.map(project => (
      <Project 
      key={project.id} 
      active={true}
      btnClass={"ViewProjects-Button-Color"} 
      listClass={"ViewProjects-List-Item"} 
      btnName={"Done"}
      linkTo={"/project/"}
      icon={"puzzle piece"}
      project={project} 
      // admin={keyHolder.admin} 
      />
    ))
  }

  const renderComplete = () => {
    return completeProjects.map(project => (
      <Project 
        key={project.id}
        active={false}
        btnClass={"ViewProjects-Button-Color-Delete"} 
        listClass={"ViewProjects-List-Item-Complete"} 
        btnName={"Delete"}
        linkTo={"/project/done/"}
        icon={"check circle"}
        project={project} 
        // admin={keyHolder.admin}
        />
    ))
  }
  
  return (
    <>
      <Container id="ViewProjects-Container">
        <ProjectHeader admin={keyHolder.admin} title={"Projects"} buttonName={"New Project"} action={"new"} newProject={"/projects/new"} iconButton={"add"} iconHeader={"clipboard list"} />
        <List divided relaxed size="large">
          { activeProjects.length !== 0 ? renderActive() : <MissingAsset message={"There are no projects pending at the moment"} icon={"coffee"} /> }
        </List>
        <Divider/>
        { keyHolder.admin && 
          <>
            <ProjectHeader title={"Arquive"} action={"none"} iconHeader={"archive"} />
            <List divided relaxed size="large">
              { completeProjects.length !== 0 ? renderComplete() : <MissingAsset message={"There are no projects archived"} icon={"folder open outline"} /> }
            </List>
          </>
        }
      </Container>
    </>
  )
}

export default ProjectsView;