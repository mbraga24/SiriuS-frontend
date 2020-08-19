import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Icon } from 'semantic-ui-react';
import { getUsers } from '../api';

const AddUsersTable = () => {

  const [users, setUsers] = useState([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [availableCount, setAvailableCount] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    getUsers()
    .then(returnedUsers => {
      const users = availableForAssignment(returnedUsers)
      setUsers(users)
      setTotalUsers(users.length)
      setAvailableCount(countAvailableUsers(users).length)
    })
  }, [dispatch])

  const availableForAssignment = (users) => {
    return users.map(user => {
      if (user.projects.length < 3) {
        return Object.assign({}, user, { available: true }) 
      } else {
        return Object.assign({}, user, { available: false }) 
      }
    })
  }
  
  const countAvailableUsers = (users) => {
    return users.filter(user => user.available !== false)
  }
  const fullName = (firstName, lastName) => {
    return `${firstName} ${lastName}`
  }

  const handleClick = (e) => {
    const userId = e.target.parentElement.id
    const user = users.find(user => user.id === parseInt(userId))
    const toggleUser = Object.assign({}, user, {available: !user.available}) 
  }

  const renderCollabotors = () =>{
    // console.log("INSIDE OF RENDER COLLABORATORS", users)
     return users.map(user => (
      <Table.Row>
        <Table.Cell>{fullName(user.first_name, user.last_name)}</Table.Cell>
        <Table.Cell>{user.job_title}</Table.Cell>
        <Table.Cell id={`${user.id}`}>
          <Button
            type="button"
            icon
            labelPosition='left'
            primary
            size='small'
            onClick={handleClick}
          >
            { user.available ? <Icon name='user' /> : <Icon name='x' /> }
            { user.available ? "Add User" : "Not Available" }
          </Button>
        </Table.Cell>
      </Table.Row>
     ))
  }

  console.log("AVAILABLE?", availableForAssignment(users))
  return (
      <Table columns={3}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Job Title</Table.HeaderCell>
            <Table.HeaderCell>Add collaborator</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>  
          {users && renderCollabotors()}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell>{totalUsers} Collaborators</Table.HeaderCell>
            <Table.HeaderCell>{availableCount} Available</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Footer>
      </Table>
  );
};

export default AddUsersTable;
