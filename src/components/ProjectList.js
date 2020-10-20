import React from 'react';
import { List, Divider } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import ProjectOption from './ProjectOption';
import ProjectHeader from './ProjectHeader';
import MissingAsset from './MissingAsset';
import '../resources/ProjectList.css';

const ProjectList = () => {

  const keyHolder = useSelector(state => state.app.keyHolder)
  const activeProjects = useSelector(state => state.activeProject.active)
  const completeProjects = useSelector(state => state.completeProject.complete)

  const renderActive = () => {
    return activeProjects.map(project => (
      <ProjectOption 
      key={project.id} 
      active={true}
      btnClass={"ProjectList-Button-Color Change-Invert"} 
      listClass={"ProjectList-List-Item"} 
      btnName={"Done"}
      linkTo={"/project/"}
      icon={"puzzle piece"}
      project={project} 
      />
    ))
  }

  const renderComplete = () => {
    return completeProjects.map(project => (
      <ProjectOption 
        key={project.id}
        active={false}
        btnClass={"ProjectList-Button-Color-Delete Change-Invert-Delete"} 
        listClass={"ProjectList-List-Item-Complete"} 
        btnName={"Delete"}
        linkTo={"/project/done/"}
        icon={"check circle"}
        project={project} 
        />
    ))
  }
  
  return (
    <React.Fragment>
      <div id="ProjectList-Container">
        <ProjectHeader admin={keyHolder.admin} title={"Projects"} buttonName={"New Project"} action={"new"} newProject={"/projects/new"} iconButton={"add"} iconHeader={"clipboard list"} />
        <List divided relaxed size="large">
          { activeProjects.length !== 0 ? renderActive() : <MissingAsset message={"There are no projects pending at the moment"} icon={"coffee"} /> }
        </List>
        <Divider/>
        { keyHolder.admin && 
          <React.Fragment>
            <ProjectHeader title={"Arquive"} action={"none"} iconHeader={"archive"} />
            <List divided relaxed size="large">
              { completeProjects.length !== 0 ? renderComplete() : <MissingAsset message={"There are no projects archived"} icon={"folder open outline"} /> }
            </List>
          </React.Fragment>
        }
      </div>
    </React.Fragment>
  )
}

export default ProjectList;