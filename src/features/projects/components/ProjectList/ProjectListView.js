import React from 'react';
import { List, Divider } from 'semantic-ui-react';
import ProjectOptions from '../ProjectOptions/ProjectOptions';
import ProjectHeader from '../ProjectHeader/ProjectHeader';
import { MissingAsset, Loading } from '../../../../shared';
import './ProjectList.css';

const ProjectListView = ({ 
  projects, 
  archiveProjects, 
  isAdmin, 
  isProjectsLoaded, 
  isArchiveLoaded 
}) => {
  const renderProjects = () => {
    return projects.map(project => (
      <ProjectOptions 
        key={project.id} 
        active={true}
        btnClass="ProjectList-Button-Color Change-Invert" 
        listClass="ProjectList-List-Item" 
        btnName="Done"
        linkToDetails="/project/"
        icon="puzzle piece"
        project={project} 
      />
    ));
  };

  const renderArchive = () => {
    return archiveProjects.map(project => (
      <ProjectOptions 
        key={project.id}
        active={false}
        btnClass="ProjectList-Button-Color-Delete Change-Invert-Delete" 
        listClass="ProjectList-List-Item-Complete" 
        btnName="Delete"
        linkToDetails="/archive/"
        icon="check circle"
        project={project} 
      />
    ));
  };
  
  return (
    <div id="ProjectList-Container">
      <ProjectHeader 
        admin={isAdmin} 
        title="Projects" 
        buttonName="New Project" 
        action="new" 
        newProject="/projects/new" 
        iconButton="add" 
        iconHeader="clipboard list" 
      />
      <List divided relaxed size="large">
        {isProjectsLoaded ? (
          projects.length !== 0 ? (
            renderProjects()
          ) : (
            <MissingAsset message="There are no projects pending at the moment" icon="coffee" />
          )
        ) : (
          <Loading loadingClass={true} />
        )}
      </List>
      <Divider/>
      {isArchiveLoaded ? (
        <>
          <ProjectHeader title="Archive" action="none" iconHeader="archive" />
          <List divided relaxed size="large">
            {archiveProjects.length !== 0 ? (
              renderArchive()
            ) : (
              <MissingAsset message="There are no projects archived" icon="folder open outline" />
            )}
          </List>
        </>
      ) : (
        <Loading loadingClass={true} />
      )}
    </div>
  );
};

export default ProjectListView;
