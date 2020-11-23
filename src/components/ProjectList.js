import React from 'react';
import { List, Divider } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import ProjectOptions from './ProjectOptions';
import ProjectHeader from './ProjectHeader';
import MissingAsset from './MissingAsset';
import Loading from './Loading';
import '../resources/ProjectList.css';

const ProjectList = () => {

  const keyHolder = useSelector(state => state.app.keyHolder)
  const isLoading = useSelector(state => state.load.isLoadingRequestIds) 
  
  const projects = useSelector(state => state.project.projects)
  const archiveProjects = useSelector(state => state.archiveProject.archive)

  const renderProjects = () => {
    return projects.map(project => (
      <ProjectOptions 
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
      <ProjectOptions 
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
        { isLoading.includes("projects") ? (projects.length !== 0 ? renderProjects() : <MissingAsset message={"There are no projects pending at the moment"} icon={"coffee"} />) : <Loading loadingClass={true} />  }
      </List>
      <Divider/>
      { 
        keyHolder.admin && 
        <>
        {
          isLoading.includes("archive") ?
          <React.Fragment>
            <ProjectHeader title={"Archive"} action={"none"} iconHeader={"archive"} />
            <List divided relaxed size="large">
              { archiveProjects.length !== 0 ? renderArchive() : <MissingAsset message={"There are no projects archived"} icon={"folder open outline"} /> }
            </List>
          </React.Fragment> : <Loading loadingClass={true} />
        }
        </>
      }
    </div>
  )
}

export default ProjectList;