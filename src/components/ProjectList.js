import React from 'react';
import { List, Divider } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import ProjectOption from './ProjectOption';
import ProjectHeader from './ProjectHeader';
import MissingAsset from './MissingAsset';
import Loading from './Loading';
import '../resources/ProjectList.css';

const ProjectList = () => {

  const keyHolder = useSelector(state => state.app.keyHolder)
  const loadProjects = useSelector(state => state.load.loadProjects) 
  const loadArquive = useSelector(state => state.load.loadArquive) 
  
  const activeProjects = useSelector(state => state.activeProject.active)
  const arquiveProjects = useSelector(state => state.arquiveProject.arquive)

  const renderProjects = () => {
    return activeProjects.map(project => (
      <ProjectOption 
      key={project.id} 
      active={true}
      btnClass={"ProjectList-Button-Color Change-Invert"} 
      listClass={"ProjectList-List-Item"} 
      btnName={"Done"}
      linkToDetails={"/project/"}
      icon={"puzzle piece"}
      project={project} 
      />
    ))
  }

  const renderArquive = () => {
    return arquiveProjects.map(project => (
      <ProjectOption 
        key={project.id}
        active={false}
        btnClass={"ProjectList-Button-Color-Delete Change-Invert-Delete"} 
        listClass={"ProjectList-List-Item-Complete"} 
        btnName={"Delete"}
        linkToDetails={"/arquive/"}
        icon={"check circle"}
        project={project} 
        />
    ))
  }
  
  return (
    <div id="ProjectList-Container">
      <ProjectHeader admin={keyHolder.admin} title={"Projects"} buttonName={"New Project"} action={"new"} newProject={"/projects/new"} iconButton={"add"} iconHeader={"clipboard list"} />
      <List divided relaxed size="large">
        { loadProjects ? <Loading loadingClass={false} />  : (activeProjects.length !== 0 ? renderProjects() : <MissingAsset message={"There are no projects pending at the moment"} icon={"coffee"} />)  }
      </List>
      <Divider/>
      { 
        keyHolder.admin && 
        <React.Fragment>
          <ProjectHeader title={"Arquive"} action={"none"} iconHeader={"archive"} />
          <List divided relaxed size="large">
            { loadArquive ? <Loading loadingClass={false} />  : (arquiveProjects.length !== 0 ? renderArquive() : <MissingAsset message={"There are no projects archived"} icon={"folder open outline"} />) }
          </List>
        </React.Fragment>
      }
    </div>
  )
}

export default ProjectList;