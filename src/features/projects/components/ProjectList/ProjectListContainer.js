import React from 'react';
import { useSelector } from 'react-redux';
import ProjectListView from './ProjectListView';

const ProjectListContainer = () => {
  const keyHolder = useSelector(state => state.app.keyHolder);
  const isLoading = useSelector(state => state.load.isLoadingRequestIds);
  const projects = useSelector(state => state.project.projects);
  const archiveProjects = useSelector(state => state.archive.projects);

  return (
    <ProjectListView
      projects={projects}
      archiveProjects={archiveProjects}
      isAdmin={keyHolder.admin}
      isProjectsLoaded={isLoading.includes("projects")}
      isArchiveLoaded={isLoading.includes("archive")}
    />
  );
};

export default ProjectListContainer;
