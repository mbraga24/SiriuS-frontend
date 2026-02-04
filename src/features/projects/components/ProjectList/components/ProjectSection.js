import React from 'react';
import { List } from 'semantic-ui-react';
import ProjectOptions from '../../ProjectOptions/ProjectOptions';
import { MissingAsset, Loading } from '../../../../../shared';

const ProjectSection = ({ 
  projects, 
  isLoaded, 
  emptyMessage, 
  emptyIcon,
  isActive = true 
}) => {
  if (!isLoaded) {
    return <Loading loadingClass={true} />;
  }

  if (projects.length === 0) {
    return <MissingAsset message={emptyMessage} icon={emptyIcon} />;
  }

  return projects.map(project => (
    <ProjectOptions 
      key={project.id} 
      active={isActive}
      btnClass={isActive ? "ProjectList-Button-Color Change-Invert" : "ProjectList-Button-Color-Delete Change-Invert-Delete"}
      listClass={isActive ? "ProjectList-List-Item" : "ProjectList-List-Item-Complete"}
      btnName={isActive ? "Done" : "Delete"}
      linkToDetails={isActive ? "/project/" : "/archive/"}
      icon={isActive ? "puzzle piece" : "check circle"}
      project={project} 
    />
  ));
};

export default ProjectSection;
