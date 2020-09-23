import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Dropdown, Menu, Button, Icon, Popup } from 'semantic-ui-react';
import '../resources/Header.css';
import { SET_KEY_HOLDER } from '../store/type';

const Header = (props) => {

  const style = {
    borderRadius: 0,
    opacity: 0.9,
    padding: '1em',
  }
  const chatFeatureMessage = "'Siri-me that list later today!' You'll be saying that soon! We're excited about our new chat feature. Our engineers are working around the clock so users can chat in real-time."

  // retrieve keyHolder from state
  const keyHolder = useSelector(state => state.app.keyHolder)
  const dispatch = useDispatch()

  const handleLogout = () => {
    // clear localStorage
    localStorage.clear()

    // update state
    dispatch({ type: SET_KEY_HOLDER, payload: null })

    // send user to the home page when logged out
    props.history.push('/home')

    // change body background color
    const body = document.querySelector('body')
    body.classList.add("bg-color-signed-in");
  }

  return(
    <>
      <Menu id="Header-Container">
        <Menu.Item as={Link} to={keyHolder.admin ? `/admin/${keyHolder.id}` : `/users/${keyHolder.id}`} className="Header-Font-Color">
          Account
        </Menu.Item>
        <Dropdown item text='Collaborators' className="Header-Font-Color">
            <Dropdown.Menu>
              <Dropdown.Item>
                <span className="Header-Font-Color">Invite</span>
              </Dropdown.Item>
              <Dropdown.Item as={Link} to='/users'>
                <span className="Header-Font-Color">View Users List</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown item text='Projects' className="Header-Font-Color">
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to='/projects/new' >
              <span className="Header-Font-Color">Create Project</span>
            </Dropdown.Item>
            <Dropdown.Item as={Link} to='/projects' >
              <span className="Header-Font-Color">View Projects List</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item className="Header-Font-Color" disabled>
          <Popup
            trigger={<Icon name='discussions' className="Header-Chat"/>}
            content={chatFeatureMessage}
            position='bottom center'
            style={style}
            inverted
          />
            Chat
          </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item onClick={handleLogout}>
            <Button className="Header-Button-Color">Logout</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </>
  )
}

export default withRouter(Header);

// ========================> LEARNED <============================
// 1) component augmentation
// 2) destructuring the 'name' input attribute in the parameters
// ===============================================================