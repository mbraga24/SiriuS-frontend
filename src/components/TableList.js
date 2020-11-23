import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Table, Header, Button, Divider, Modal, Dropdown } from 'semantic-ui-react';
import MissingAsset from './MissingAsset';
import InvitationForm from './InvitationForm';
import Loading from './Loading';
import '../resources/TableList.css';

const TableList = props => {


  console.log("PROPS LOADITEMS", props.loadItems)
  console.log("PROPS HEADERICON", props.headerIcon)

  const keyHolder = useSelector(state => state.app.keyHolder)
  const [ firstOpen, setFirstOpen ] = useState(false)
  const [ secondOpen, setSecondOpen ] = useState(false)
  const [ open, setOpen ] = useState(false)
  const [ userId, setUserId ] = useState(null)

  const closeWindows = () => {
    setSecondOpen(false)
    setFirstOpen(false)
  }

  // save user id in state
  const saveItemId = userId => {
    setUserId(userId)
  }

  // send user Id to the custom function to remove user and close modal
  const handleDelete = id => {
    props.func(id)
    setOpen(false)
  }

  const iconUserAction = (buttonId, colorId) => {
    const icon = document.querySelector(`.Icon-User-Action-${buttonId}`)
    icon.style.color = colorId
  }

  const iconRemoveUserAction = (buttonId, colorId) => {
    const icon = document.querySelector(`.Icon-Remove-Action-${buttonId}`)
    icon.style.color = colorId
  }

  const renderRows = () => {
    return props.items.map(item => {
      return (
        <Table.Row key={item.id} >
          <Table.Cell>{item.first_name}</Table.Cell>
          <Table.Cell>{item.last_name}</Table.Cell>
          <Table.Cell>{item.email}</Table.Cell>
          <Table.Cell  className={props.inviteActions ? "Hide-Column" : ""}>{item.job_title}</Table.Cell>
          { keyHolder.admin && 
            <>
              <Table.Cell 
                textAlign="center" 
                onMouseOver={() => iconUserAction(item.id, "#ffffff")} 
                onMouseLeave={() => iconUserAction(item.id, "#79589f")} 
                className={`TableList-Cell ${props.inviteActions ? "Hide-Column" : ""}`}
              >
                <Link to={`/user/projects/${item.id}`}> 
                  <Icon 
                    name='user' 
                    size="large" 
                    className={`TableList-Icon-Actions-Color Icon-User-Action-${item.id}`}
                  />
                </Link>
              </Table.Cell>
                <Modal
                  closeIcon
                  size="tiny"
                  open={open}
                  trigger={ 
                    <Table.Cell 
                      textAlign='center'
                      onMouseOver={() => iconRemoveUserAction(item.id, "#ffffff")} 
                      onMouseLeave={() => iconRemoveUserAction(item.id, "#79589f")} 
                      className="TableList-Cell"
                      >
                      <Icon name={props.removeOptionIcon} size="large" className={`TableList-Icon-Actions-Color Icon-Remove-Action-${item.id}`} onClick={() => saveItemId(item.id)}/>
                    </Table.Cell>
                  }
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                >
                  <Header icon="trash" content='Confirm' />
                  <Modal.Content>
                    {
                      props.inviteActions ?
                      <p>
                        This user won't be able to sign up to the application anymore. Cancel invitation?
                      </p> :
                      <p>
                        Are you sure you want to remove this collaborator from your list? All documents shared by this collaborator will also be deleted.
                      </p>
                    }
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color='red' onClick={() => setOpen(false)}>
                      <Icon name='remove' /> No
                    </Button>
                    <Button color='green' onClick={() => handleDelete(userId)}>
                      <Icon name='checkmark' /> Yes
                    </Button>
                  </Modal.Actions>
                </Modal>
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
          <Icon name={props.headerIcon} size="large" className="TableList-Icon-Color"/>
          <Header.Content>
            <span className="TableList-Title">{props.header}</span>
          </Header.Content>
        </span>
        {
          keyHolder.admin && 
          <Dropdown.Item>
          <React.Fragment>
            { props.items.length === 0 && !props.inviteActions && <Icon name='pointing right' size="large" className="TableList-Icon-Actions-Color" /> }
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
        <>
        { 
          props.items.length !== 0 ?
          <Table celled structured>
            <Table.Header>
            <Table.Row textAlign='center'>
              <Table.HeaderCell rowSpan='2'>First Name</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Last Name</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Email</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2' className={props.inviteActions ? "Hide-Column" : ""}>Job Title</Table.HeaderCell>
              {
                keyHolder.admin &&
                <>
                  <Table.HeaderCell className={props.inviteActions ? "Hide-Column" : ""} rowSpan='1'>History</Table.HeaderCell>
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
          </Table> : props.inviteActions ? <MissingAsset message={"No pending invites"} icon={"sticky note outline"} /> : <MissingAsset message={"This organization has no collaborators"} icon={"address book"} />
        }
        </> : <Loading loadingClass={true} />
      }
    </div>
  )

}

export default TableList;