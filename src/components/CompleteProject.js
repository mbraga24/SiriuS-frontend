import React from 'react';
import { Link } from 'react-router-dom';
import { List, Button } from 'semantic-ui-react';

const CompleteProject = props => {

  const { id, name, start_date, due_date } = props.project

  return  (
    <List.Item className="ViewProjects-List-Item-Complete">
      <List.Icon name='checkmark' size='large' verticalAlign='middle' className="ViewProjects-Icon-Color" />
      <List.Content>
        <List.Content floated='right'>
          <Link to={`/project/done/${id}`}>
            <Button className="ViewProjects-Button-Color">Details</Button>
          </Link>
        </List.Content>
          <Link to={`/project/done/${id}`}>
            <List.Header as='a' className="ViewProjects-Project-Name">{name}</List.Header>
          </Link>
        <List.Description as='a'className="ViewProjects-Project-Date">Start date: {start_date} | Due date: {due_date}</List.Description>
      </List.Content>
    </List.Item>
  )
}

export default CompleteProject;

