import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Table, Header, Button, Divider, Modal, Dropdown } from 'semantic-ui-react';
import MissingAsset from './MissingAsset';
import InvitationForm from './InvitationForm';
import Loading from './Loading';
import '../resources/TableList.css';

const TableList = props => {

  const keyHolder = useSelector(state => state.app.keyHolder)
  const [ firstOpen, setFirstOpen ] = useState(false)
  const [ secondOpen, setSecondOpen ] = useState(false)

  const closeWindows = () => {
    setSecondOpen(false)
    setFirstOpen(false)
  }

  const iconUserAction = (buttonId, colorId) => {
    const icon = document.querySelector(`.Icon-User-Action-${buttonId}`)
    icon.style.color = colorId
  }

  const iconRemoveAction = (buttonId, colorId) => {
    const icon = document.querySelector(`.Icon-Remove-Action-${buttonId}`)
    icon.style.color = colorId
  }

  const renderRows = () => {
    return props.items.map(item => {
      return (
        <Table.Row key={item.id}>
          <Table.Cell>{item.first_name}</Table.Cell>
          <Table.Cell>{item.last_name}</Table.Cell>
          <Table.Cell>{item.email}</Table.Cell>
          <Table.Cell className={props.hideColumn ? "Hide-Column" : ""}>{item.job_title}</Table.Cell>
          { keyHolder.admin && 
            <>
              <Table.Cell 
                textAlign="center" 
                onMouseOver={() => iconUserAction(item.id, "#ffffff")} 
                onMouseLeave={() => iconUserAction(item.id, "#79589f")} 
                className={`TableList-Cell ${props.hideColumn ? "Hide-Column" : ""}`}
                >
                <Link to={`/user/projects/${item.id}`}> 
                  <Icon name='user' size="large" className={`TableList-Icon-Actions-Color Icon-User-Action-${item.id}`}/>
                </Link>
              </Table.Cell>
              <Table.Cell 
                textAlign='center'
                onMouseOver={() => iconRemoveAction(item.id, "#ffffff")} 
                onMouseLeave={() => iconRemoveAction(item.id, "#79589f")} 
                className="TableList-Cell"
                >
                <Icon name='user times' size="large" className={`TableList-Icon-Actions-Color Icon-Remove-Action-${item.id}`} onClick={() => props.func(item.id)} />
              </Table.Cell>
            </>
          }
        </Table.Row>
      ) 
    })
  }

  return (
    <div id="TableList-Container">
      <Header as='h2' className="TableList-Header-Align-Items">
        <span>
          <Icon name={props.iconName} size="large" className="TableList-Icon-Color"/>
          <Header.Content>
            <span className="TableList-Title">{props.header}</span>
          </Header.Content>
        </span>
        {
          keyHolder.admin && 
          <Dropdown.Item>
          <React.Fragment>
            <Button className="TableList-Button-Invite-User" onClick={() => setFirstOpen(true)}>
              <Icon name='user plus' /> 
              Invite Collaborator
            </Button>
            <Modal
              onClose={() => setFirstOpen(false)}
              onOpen={() => setFirstOpen(true)}
              open={firstOpen}
            >
              <Modal.Header>
                <Icon name='user plus' /> 
                Invite Collaborator
              </Modal.Header>
              <Modal.Content>
                <InvitationForm setSecondOpen={setSecondOpen} />
              </Modal.Content>
              <Modal
                onClose={() => setSecondOpen(false)}
                open={secondOpen}
                size='mini'
              >
                <Modal.Header>Invitation sent!</Modal.Header>
                <Modal.Actions>
                  <Button icon='check' color="green" content='All set' onClick={closeWindows} />
                </Modal.Actions>
              </Modal>
            </Modal>
          </React.Fragment>
          </Dropdown.Item>
        }
      </Header>
      <Divider/>
      {
        props.loadItems ? 
        <Loading loadingClass={true} />
        :
        props.items.length !== 0 ?
        <Table celled structured>
          <Table.Header>
          <Table.Row textAlign='center'>
            <Table.HeaderCell rowSpan='2'>First Name</Table.HeaderCell>
            <Table.HeaderCell rowSpan='2'>Last Name</Table.HeaderCell>
            <Table.HeaderCell rowSpan='2'>Email</Table.HeaderCell>
            <Table.HeaderCell className={props.hideColumn ? "Hide-Column" : ""} rowSpan='2'>Job Title</Table.HeaderCell>
            {
              keyHolder.admin &&
              <>
                <Table.HeaderCell className={props.hideColumn ? "Hide-Column" : ""} rowSpan='1'>History</Table.HeaderCell>
                <Table.HeaderCell rowSpan='1'>Remove</Table.HeaderCell> 
              </>
            }
          </Table.Row>
          </Table.Header>
          {
            props.items && 
            <Table.Body>
              {renderRows()}
            </Table.Body>
          }
        </Table> : <MissingAsset message={"No pending invites"} icon={"sticky note outline"} />
      }
    </div>
  )

}

export default TableList;