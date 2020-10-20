import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Dropdown, Menu, Button, Icon, Popup } from 'semantic-ui-react';
import '../resources/MenuBar.css';
import { SET_KEY_HOLDER } from '../store/type';

const MenuBar = (props) => { 

  const style = {
    borderRadius: 0,
    opacity: 0.9,
    padding: '1em',
  }
  const chatFeatureMessage = "'Siri-me that list later today!' You'll be saying that soon! We're excited about our new chat feature. Our engineers are working around the clock so users can chat in real-time."

  // retrieve keyHolder from store
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
    <React.Fragment>
      <Menu id="MenuBar-Container">
        <Menu.Item as={Link} to={keyHolder.admin && `/users/${keyHolder.id}`} className="MenuBar-Font-Color">
          Account
        </Menu.Item>
          { keyHolder.admin ?
            <Dropdown item text='Collaborators' className="MenuBar-Font-Color">
              <Dropdown.Menu>
                { keyHolder.admin && 
                  <Dropdown.Item>
                    <span className="MenuBar-Font-Color">Invite</span>
                  </Dropdown.Item>
                }
                <Dropdown.Item as={Link} to='/users'>
                  <span className="MenuBar-Font-Color">Users List</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            :
            <Menu.Item as={Link} to={`/user/projects/${keyHolder.id}`} className="MenuBar-Font-Color">
              History
            </Menu.Item>
          }
          <Dropdown item text={keyHolder.admin ? "Projects" : "More"} className="MenuBar-Font-Color">
          { keyHolder.admin ?
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to='/projects' >
                <span className="MenuBar-Font-Color">Projects List</span>
              </Dropdown.Item>
              <Dropdown.Item as={Link} to='/projects/new' >
                <span className="MenuBar-Font-Color">Create Project</span>
              </Dropdown.Item>
            </Dropdown.Menu>
            :
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to='/projects' >
                <span className="MenuBar-Font-Color">Projects List</span>
              </Dropdown.Item>
              <Dropdown.Item as={Link} to='/users' >
                <span className="MenuBar-Font-Color">Collaborators</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          }
          </Dropdown>
        <Menu.Item className="MenuBar-Font-Color" disabled>
          <Popup
            trigger={<Icon name='discussions' className="MenuBar-Chat"/>}
            content={chatFeatureMessage}
            position='bottom center'
            style={style}
            inverted
          />
            Chat
          </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item onClick={handleLogout}>
            <Button className="MenuBar-Button-Color Button-Change">Logout</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </React.Fragment>
  )
}

export default withRouter(MenuBar);

// ========================> LEARNED <============================
// 1) component augmentation
// 2) destructuring the 'name' input attribute in the parameters
// ===============================================================