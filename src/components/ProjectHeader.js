import React from 'react';
import { Header, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ProjectHeader = props => {

  return (
    <Header as='h2' className="ProjectList-Header-Align-Items">
      <span>
        <Icon name={props.iconHeader} size="large" className="ProjectList-Icon-Color"/>
        <Header.Content>
          <span className="ProjectList-Title">{props.title}</span>
        </Header.Content>
      </span>
      { (props.action !== "none" && props.admin) &&
        <span>
          <Link to={props.action === "new" && `${props.newProject}`}>
            <Button className="ProjectList-Button-Create-Color Button-Change" >
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