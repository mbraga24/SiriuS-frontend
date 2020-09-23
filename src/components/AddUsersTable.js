import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Icon, Header } from 'semantic-ui-react';
import { ADD_USER_PROJECT, REMOVE_USER_PROJECT } from '../store/type';
import '../resources/AddUsersTable.css';

const AddUsersTable = () => {

  const users = useSelector(state => state.user.users)
  const addUsersId = useSelector(state => state.project.addUsersId)
  const dispatch = useDispatch()

  const fullName = (firstName, lastName) => {
    return `${firstName} ${lastName}`
  }

  const handleClick = (userId) => {
    // find elements
    const button = document.getElementById(`Assign-User-${userId}`)
    const icon = document.getElementById(`Assign-Button-${userId}`)

    if (!addUsersId.includes(userId)) {
      dispatch({ type: ADD_USER_PROJECT, payload: userId })
      // change button and icon
      button.className += " Selected"
      icon.classList.remove("user")
      icon.className += " check"
    } else {
      const filteredIds = addUsersId.filter(id => id !== userId)
      dispatch({ type: REMOVE_USER_PROJECT, payload: filteredIds })
      // change button and icon back
      button.classList.remove("Selected")
      icon.classList.remove("check")
      icon.className += " user"
    }
  }

  const renderCollabotors = (users) => {
     return users.map(user => (
      <React.Fragment key={user.id}>
        { user.available && (
          <Table.Row>
            <Table.Cell>{fullName(user.first_name, user.last_name)}</Table.Cell>
            <Table.Cell>{user.job_title}</Table.Cell>
            <Table.Cell>
              <Button
                type="button"
                labelPosition='left'
                size='small'
                icon
                id={`Assign-User-${user.id}`}
                className="AddUsersTable-Button-Color"
                onClick={() => handleClick(user.id)}
              >
              <>
                <Icon name="user" id={`Assign-Button-${user.id}`}/> 
                  Assign
              </>
              </Button>
            </Table.Cell>
          </Table.Row>
          )
        }
      </React.Fragment>
     ))
  }

  return (
    <>
      <div id="AddUsersTable-Container">
        <Header as='h2' className="AddUsersTable-Header">
          <span>
            <Icon name='users' size="large" className="AddUsersTable-Icon-Color"/>
            <Header.Content>
              <span className="AddUsersTable-Title">Collaborators</span>
            </Header.Content>
          </span>
        </Header>
        <Table columns={3}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Job Title</Table.HeaderCell>
              <Table.HeaderCell>Add collaborator</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>  
            {users && renderCollabotors(users)}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default AddUsersTable;
