import React, { useState, useEffect } from 'react';
import { List, Divider } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import ProjectOption from './ProjectOption';
import ProjectHeader from './ProjectHeader';
import MissingAsset from './MissingAsset';
import Loading from './Loading';
import '../resources/ProjectList.css';

const ProjectList = () => {

  const [ loadArchive, setLoadArchive ] = useState(true)
  const [ loadProjects, setLoadProjects ] = useState(true)
  const keyHolder = useSelector(state => state.app.keyHolder)
  
  const projects = useSelector(state => state.project.projects)
  const archiveProjects = useSelector(state => state.archiveProject.archive)

  useEffect(() => {
    setLoadArchive(!archiveProjects)
    setLoadProjects(!projects)
  }, [loadProjects, loadArchive, projects, archiveProjects])

  const renderProjects = () => {
    return projects.map(project => (
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

  const renderArchive = () => {
    return archiveProjects.map(project => (
      <ProjectOption 
        key={project.id}
        active={false}
        btnClass={"ProjectList-Button-Color-Delete Change-Invert-Delete"} 
        listClass={"ProjectList-List-Item-Complete"} 
        btnName={"Delete"}
        linkToDetails={"/archive/"}
        icon={"check circle"}
        project={project} 
        />
    ))
  }
  
  return (
    <div id="ProjectList-Container">
      <ProjectHeader admin={keyHolder.admin} title={"Projects"} buttonName={"New Project"} action={"new"} newProject={"/projects/new"} iconButton={"add"} iconHeader={"clipboard list"} />
      <List divided relaxed size="large">
        { loadProjects ? <Loading loadingClass={false} />  : (projects.length !== 0 ? renderProjects() : <MissingAsset message={"There are no projects pending at the moment"} icon={"coffee"} />)  }
      </List>
      <Divider/>
      { 
        keyHolder.admin && 
        <React.Fragment>
          <ProjectHeader title={"Archive"} action={"none"} iconHeader={"archive"} />
          <List divided relaxed size="large">
            { loadArchive ? <Loading loadingClass={false} />  : (archiveProjects.length !== 0 ? renderArchive() : <MissingAsset message={"There are no projects archived"} icon={"folder open outline"} />) }
          </List>
        </React.Fragment>
      }
    </div>
  )
}

export default ProjectList;