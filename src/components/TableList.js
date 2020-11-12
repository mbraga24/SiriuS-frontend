import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Table, Header, Button, Divider } from 'semantic-ui-react';
import '../resources/UserList.css';
import Loading from './Loading';
const TableList = props => {

  const renderRows = () => {
    return props.items.map(item => {
      // return (item.id !== props.keyHolder.id) ? 
      return (
        <Table.Row key={item.id}>
          <Table.Cell>{item.first_name}</Table.Cell>
          <Table.Cell>{item.last_name}</Table.Cell>
          <Table.Cell>{item.email}</Table.Cell>
          <Table.Cell className={props.hideColumn && "Hide-Column"}>{item.job_title}</Table.Cell>
          { props.keyHolder.admin && 
            <>
              <Table.Cell className={props.hideColumn && "Hide-Column"} textAlign='center'>
                <Link to={`/user/projects/${item.id}`}> 
                  <Icon name='user' size="large" className="UserList-Icon-Color"/>
                </Link>
              </Table.Cell>
              <Table.Cell textAlign='center'>
                <Icon name='user times' size="large" className="UserList-Icon-Color" onClick={() => props.func(item.id)} />
              </Table.Cell>
            </>
          }
        </Table.Row>
      ) 
    })
  }

  console.log("TABLELIST - ITEMS -->", props.items)

  return (
    <div id="UserList-Container">
      <Header as='h2' className="UserList-Header-Align-Items">
        <span>
          <Icon name={props.iconName} size="large" className="UserList-Icon-Color"/>
          <Header.Content>
            <span className="UserList-Title">{props.header}</span>
          </Header.Content>
        </span>
        {
          props.keyHolder.admin && 
          <span>
            <Button className="UserList-Button-Invite-User" disabled>
              <Icon name='user plus' /> 
              Invite Collaborator
            </Button>
          </span>
        }
      </Header>
      <Divider/>
      {
        props.loadItems ? 
        <Loading loadingClass={true} />
        :
        <Table celled structured>
          <Table.Header>
          <Table.Row textAlign='center'>
            <Table.HeaderCell rowSpan='2'>First Name</Table.HeaderCell>
            <Table.HeaderCell rowSpan='2'>Last Name</Table.HeaderCell>
            <Table.HeaderCell rowSpan='2'>Email</Table.HeaderCell>
            <Table.HeaderCell className={props.hideColumn && "Hide-Column"} rowSpan='2'>Job Title</Table.HeaderCell>
            {
              props.keyHolder.admin &&
              <>
                <Table.HeaderCell className={props.hideColumn && "Hide-Column"} rowSpan='1'>History</Table.HeaderCell>
                <Table.HeaderCell rowSpan='1'>Remove</Table.HeaderCell> 
              </>
            }
          </Table.Row>
          </Table.Header>
          {props.items && renderRows()}
        </Table>
      }
    </div>
  )

}

export default TableList;