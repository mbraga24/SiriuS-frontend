import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Table, Container, Header, Button, Divider } from 'semantic-ui-react';
import '../resources/ViewUsers.css';
import { getUsers } from '../api'


const ViewUsers = () => {

  const dispatch = useDispatch()
  const users = useSelector(state => state.user.users)
  const projects = useSelector(state => state.project.projects)

  useEffect(() => {
    getUsers()
    .then(usersData => {
      dispatch({ type: "SET USERS", payload: usersData })
    })
  }, [dispatch])

  // create an array of null values of the same number of projects
  const noAssignments = () => {
    const setAllToNull = []
    let n = 0;
    while (n < projects.length) {
      

      
      setAllToNull.push(null)
      n++;
    }
    return setAllToNull
  }

  // 
  const setAssignedProjects = (userData) => {
    if (userData.length === 0) {
      return noAssignments()
    } else if (userData.length === projects.length) {
      return userData
    } else {
      return [...userData, null]
    }
  }
  // console.log("VIEW USERS ===>", users[0].projects[0])

  const renderRows = () => {
    return users.map(user => (
      
      // console.log(user.projects)
      <Table.Row key={user.id}>
        <Table.Cell>{user.first_name}</Table.Cell>
        <Table.Cell>{user.last_name}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>{user.job_title}</Table.Cell>
        {
          setAssignedProjects(user.projects).map(project => (
            project ?
            <>
              <Table.Cell textAlign='center'>
                <Icon color='green' name='checkmark' size='large' />
              </Table.Cell> 
            </>
            : 
            <Table.Cell></Table.Cell>
          )) 
         } 
      </Table.Row>
    ))
  }
  return (
    <Container id="ViewUsers-Container">
      <Header as='h2' className="ViewUsers-Header-Align-Items">
        <span>
          <Icon name='users' size="large" className="ViewUsers-Icon-Color"/>
          <Header.Content>
            <span className="ViewUsers-Title">Collaborators</span>
          </Header.Content>
        </span>
        <span>
          <Button className="ViewUsers-Button-Invite-User" disabled>
            <Icon name='add' /> 
            Invite Collaborator
          </Button>
        </span>
      </Header>
      <Divider/>
      <Table celled structured>
        <Table.Header>
        <Table.Row>
          <Table.HeaderCell rowSpan='2'>First Name</Table.HeaderCell>
          <Table.HeaderCell rowSpan='2'>Last Name</Table.HeaderCell>
          <Table.HeaderCell rowSpan='2'>Email</Table.HeaderCell>
          <Table.HeaderCell rowSpan='2'>Job Title</Table.HeaderCell>
          <Table.HeaderCell colSpan='2'>Projects</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Project 1</Table.HeaderCell>
          <Table.HeaderCell>Project 2</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
          {users && renderRows()}
        <Table.Body>
          
        </Table.Body>
      </Table>
    </Container>
  )
}

export default ViewUsers;
{/* <Table.Cell error>
<Icon name='attention' />
  Classified
</Table.Cell> 
</Table.Cell> */}


const collectProjects = (user) => {
  return user.projects.map(project => project) 
}
    //  users.map(user => (
        //    console.log(user)
        //   // console.log(collectProjects(user))
        //  ))
        // projects.map((project) => {
        //   return users.projects.map(userProject => {
        //     return userProject === project ? (
              // <>
              //   <Table.Cell textAlign='center'>
              //     <Icon color='green' name='checkmark' size='large' />
              //   </Table.Cell>
              // </>
        //     ) : (
              // <Table.Cell></Table.Cell>
        //     )
        //   })
        // })