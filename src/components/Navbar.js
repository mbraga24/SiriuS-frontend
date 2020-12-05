import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Dropdown, Menu, Button, Icon, Popup, Modal } from 'semantic-ui-react';
import InvitationForm from './InvitationForm';
import '../resources/Navbar.css';
import { SET_KEY_HOLDER } from '../store/type';

const Navbar = (props) => { 

  const chatFeatureMessage = "'Siri-me that document later today!' We're excited with our new chat feature. Coming soon."

  const keyHolder = useSelector(state => state.app.keyHolder)
  const dispatch = useDispatch()

  const [ firstOpen, setFirstOpen ] = useState(false)
  const [ secondOpen, setSecondOpen ] = useState(false)

  const closeWindows = () => {
    setSecondOpen(false)
    setFirstOpen(false)
  }

  const handleLogout = () => {
    localStorage.clear()
    dispatch({ type: SET_KEY_HOLDER, payload: null })
    props.history.push('/')
    
    const body = document.querySelector('body')
    body.classList.add("bg-color-home")
  }
  
  return(
    <React.Fragment>
      <Menu id="Navbar-Container">
        <Menu.Item as={Link} to={`/users/${keyHolder.id}`} className="Navbar-Font-Color">
          Account
        </Menu.Item>
          { keyHolder.admin ?
            <Dropdown item text='Collaborators' className="Navbar-Font-Color">
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/users'>
                  <span className="Navbar-Font-Color">Collaborators List</span>
                </Dropdown.Item>
                { keyHolder.admin && 
                  <Dropdown.Item>
                    <>
                      <span className="Navbar-Font-Color Invite-Btn" onClick={() => setFirstOpen(true)}>New Invitation</span>
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
                    </>
                  </Dropdown.Item>
                }
                <Dropdown.Item as={Link} to='/invitations'>
                  <span className="Navbar-Font-Color">Pending Invites</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            :
            <Menu.Item as={Link} to={`/user/projects/${keyHolder.id}`} className="Navbar-Font-Color">
              History
            </Menu.Item>
          }
          <Dropdown item text={keyHolder.admin ? "Projects" : "More"} className="Navbar-Font-Color">
          { keyHolder.admin ?
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to='/projects' >
                <span className="Navbar-Font-Color">Projects List</span>
              </Dropdown.Item>
              <Dropdown.Item as={Link} to='/projects/new' >
                <span className="Navbar-Font-Color">Create Project</span>
              </Dropdown.Item>
            </Dropdown.Menu>
            :
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to='/projects' >
                <span className="Navbar-Font-Color">Projects List</span>
              </Dropdown.Item>
              <Dropdown.Item as={Link} to='/users' >
                <span className="Navbar-Font-Color">Collaborators</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          }
          </Dropdown>
        <Menu.Item className="Navbar-Font-Color" disabled>
          <Popup
            trigger={<Icon name='discussions' className="Navbar-Chat"/>}
            content={chatFeatureMessage}
            position='bottom center'
            inverted
          />
            Chat
          </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item onClick={handleLogout}>
            <Button className="Navbar-Button-Color Button-Change">Logout</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </React.Fragment>
  )
}

export default withRouter(Navbar);

// ========================> LEARNED <============================
// 1) component augmentation
// 2) destructuring the 'name' input attribute in the parameters
// ===============================================================