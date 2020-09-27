import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isLoggedIn, getProjects, getUsers, getDocuments } from '../api';
import Header from './Header';
import Home from './Home';
import ViewUsers from './ViewUsers';
import Login from './Login';
import Signup from './Signup';
import Account from './Account';
import ViewProjects from './ViewProjects';
import NewProject from './NewProject';
import ViewUserProjects from './ViewUserProjects';
import ShowProject from './ShowProject';
import { SET_KEY_HOLDER, SET_PROJECTS, SET_USERS, SET_COMPLETE_PROJECTS, SET_DOCUMENTS } from '../store/type';

const App = () => {
  
  const dispatch = useDispatch()
  const keyHolder = useSelector(state => state.app.keyHolder)

  // Fetch user to keep user logged in
  useEffect(() => {
    if (localStorage.token) {
      const token = localStorage.token
      isLoggedIn(token)
      .then(loggedInUser => {
        // update state
        dispatch({ type: SET_KEY_HOLDER, payload: loggedInUser })
      })
      // change body background color
      const body = document.querySelector('body')
      body.classList.remove("bg-color-signed-in")
    }

  }, [dispatch]) 

  // Fetch projects
  useEffect(() => {
    getProjects()
    .then(projectData  => {
      dispatch({ type: SET_PROJECTS, payload: projectData })
      dispatch({ type: SET_COMPLETE_PROJECTS, payload: projectData })
    })
  }, [dispatch])

  // Fetch documents
  useEffect(() => {
    getDocuments()
    .then(docuData  => {
      dispatch({ type: SET_DOCUMENTS, payload: docuData })
    })
  }, [dispatch])

  // Fetch users
  useEffect(() => {
    getUsers()
    .then(usersData => {
      dispatch({ type: SET_USERS, payload: usersData })
    })
  }, [dispatch])

  return (
    <div>
      { keyHolder ? <Header /> : null}
      <Switch>
        { keyHolder && (
            <>
              <Route exact path="/users" render={ () => <ViewUsers/>} />
              <Route path="/users/:id" render={ () => <Account />} />
              <Route exact path="/projects" render={ () => <ViewProjects />} />
              <Route path="/project/:id" render={ () => <ShowProject/>} />
              <Route path="/project/done/:id" render={ () => <ShowProject/>} />
              <Route path='/user/projects/:id' render={() => <ViewUserProjects />} />
              <Route path="/projects/new" render={ () => <NewProject />} />
              <Route path="/admin/:id" render={ () => <Account />} />
            </>
          ) 
        }
        <Route exact path="/" render={ () => <Home/>} />
        <Route path="/signup" render={ () => <Signup/>} />
        <Route path="/login" render={ () => <Login/>} />
        { !keyHolder ? <Redirect to="/" /> : <Redirect to="/account" />}
      </Switch>
    </div>
  );
}

export default withRouter(App);