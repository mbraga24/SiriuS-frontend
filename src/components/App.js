import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isLoggedIn, getProjects } from '../api';
import Header from './Header';
import Home from './Home';
import ViewUsers from './ViewUsers';
import Login from './Login';
import Signup from './Signup';
import Account from './Account';
import ViewProjects from './ViewProjects';
import NewProject from './NewProject';

const App = () => {

  const dispatch = useDispatch()
  const { keyHolder, isLoading } = useSelector(state => {
    return {
      keyHolder: state.app.keyHolder,
      isLoading: state.app.isLoading
    }
  })

  useEffect(() => {
    if (localStorage.token) {
      const token = localStorage.token
      const credentials = localStorage.credentials

      if (credentials === 'admin') {
        isLoggedIn(token)
        .then(loggedInAdmin => {
          // update state
          dispatch({ type: "SET KEY HOLDER", payload: loggedInAdmin })
        })

      } else {
        console.log("IT MUST BE A USER THEN")
      }
      // change body background color
      const body = document.querySelector('body')
      body.classList.remove("bg-color-signed-in")
    }
  }, [dispatch]) 


  useEffect(() => {
    getProjects()
    .then(projectData => {
      dispatch({ type: "SET PROJECTS", payload: projectData })
    })
  }, [dispatch])

  // console.log("IS LOADING JUST BEFORE RETURN:", isLoading)
  return (
    <div>
      { keyHolder && <Header/> }
      <Switch>
        <Route exact path="/" render={ () => <Home/>} />
        { keyHolder && (
            <>
              <Route path="/users" render={ () => <ViewUsers/>} />
              <Route exact path="/projects" render={ () => <ViewProjects/>} />
              <Route path="/projects/new" render={ () => <NewProject/>} />
              <Route exact path='/admins/:id' render={ () => <Account />} />
            </>
          )
        }
        <Route path="/signup" render={ () => <Signup/>} />
        <Route path="/login" render={ () => <Login/>} />
        { !keyHolder ? <Redirect to="/" /> : <Redirect to="/account" />}
      </Switch>
    </div>
  );
}

export default withRouter(App);

// ========================> CONCEPTS <============================
// 1) Implemented the Redirect component from react-router-dom
// ===============================================================