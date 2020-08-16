import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, Menu } from 'semantic-ui-react'

const Header = () => {

  // retrieve keyHolder from state
  const keyHolder = useSelector(state => state.app.keyHolder)

  // menu state
  const [ activeItem, setItem ] = useState('home')

  // set menu state on click
  const handleItemClick = (e, { name }) => {
    setItem(name)
  }

  return(
    <>
      <Menu inverted stackable>
        {/* { !currentAdmin &&
          <Menu.Item
          as={Link} 
          to='/'
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          >
            Home
        </Menu.Item>
        } */}
        <Menu.Item
          as={Link}
          to={`/admins/${1}`}
          name='account'
          active={activeItem === 'account'}
          onClick={handleItemClick}
        >
          Account
        </Menu.Item>
          <Dropdown 
            item 
            text='Collaborators'
            name='collaborators'
            active={activeItem === 'collaborators'}
            onClick={handleItemClick} >
            <Dropdown.Menu>
              <Dropdown.Item>Invite</Dropdown.Item>
              <Dropdown.Item as={Link} to='/users' >
                  View Users List
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown 
            item 
            text='Projects'
            name='projects'
            active={activeItem === 'projects'}
            onClick={handleItemClick}>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to='/projects/new' >
              Create Project
            </Dropdown.Item>
            <Dropdown.Item as={Link} to='/projects' >
              View Projects List
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Menu position='right'>
          { !keyHolder && 
            <>
              <Menu.Item
                as={Link}
                to="/signup"
                name='signup'
                active={activeItem === 'signup'}
                onClick={handleItemClick}
              >
                Sign Up
              </Menu.Item>
              <Menu.Item
                as={Link}
                to="/login"
                name='sign-in'
                active={activeItem === 'sign-in'}
                onClick={handleItemClick}
              >
                Sign In
              </Menu.Item>
            </>
          }
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={handleItemClick}
          >
            Logout
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </>
  )
}

export default Header;

// ========================> LEARNED <============================
// 1) component augmentation
// 2) destructuring the 'name' input attribute in the parameters
// ===============================================================