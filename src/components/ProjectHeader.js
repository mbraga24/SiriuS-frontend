import React from 'react';
import { Header, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ProjectHeader = props => {

  return (
    <Header as='h2' className="ViewProjects-Header-Align-Items">
      <span>
        <Icon name={props.iconHeader} size="large" className="ViewProjects-Icon-Color"/>
        <Header.Content>
          <span className="ViewProjects-Title">{props.title}</span>
        </Header.Content>
      </span>
      { props.action !== "none" &&
        <span>
          <Link to={props.action === "new" && `${props.newProject}`}>
            <Button className="ViewProjects-Button-Create-Project" >
              <Icon name={props.iconButton} /> 
              {props.buttonName}
            </Button>
          </Link>
        </span>
      }
    </Header>
  );
}

export default ProjectHeader;