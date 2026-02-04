import React from 'react';
import { List, Divider } from 'semantic-ui-react';
import ProjectHeader from '../ProjectHeader/ProjectHeader';
import ProjectSection from './components/ProjectSection';
import './ProjectList.css';

const ProjectListView = ({ 
  projects, 
  archiveProjects, 
  isAdmin, 
  isProjectsLoaded, 
  isArchiveLoaded 
}) => {
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
        <ProjectSection
          projects={projects}
          isLoaded={isProjectsLoaded}
          emptyMessage="There are no projects pending at the moment"
          emptyIcon="coffee"
          isActive={true}
        />
      </List>
      <Divider/>
      <ProjectHeader title="Archive" action="none" iconHeader="archive" />
      <List divided relaxed size="large">
        <ProjectSection
          projects={archiveProjects}
          isLoaded={isArchiveLoaded}
          emptyMessage="There are no projects archived"
          emptyIcon="folder open outline"
          isActive={false}
        />
      </List>
    </div>
  );
};

export default ProjectListView;
