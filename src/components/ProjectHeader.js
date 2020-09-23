import React from 'react';
import { Header, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { clearProjectList } from '../api';

const ProjectHeader = props => {

  const clearList = () => {
    clearProjectList()
    .then(console.log)
  }

  return (
    <Header as='h2' className="ViewProjects-Header-Align-Items">
      <span>
        <Icon name='clipboard list' size="large" className="ViewProjects-Icon-Color"/>
        <Header.Content>
          <span className="ViewProjects-Title">{props.title}</span>
        </Header.Content>
      </span>
      <span>
        <Link to={!props.clear && `${props.newProject}`}>
          <Button 
            className="ViewProjects-Button-Create-Project"
            onClick={props.clear && clearList} >
            <Icon name='add' /> 
            {props.button}
          </Button>
        </Link>
      </span>
    </Header>
  );
}

export default ProjectHeader;