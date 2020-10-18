import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { autoLogin, getProjects, getUsers, getDocuments } from '../api';
import Header from './Header';
import Home from './Home';
import UserList from './UserList';
import Login from './Login';
import Signup from './Signup';
import Account from './Account';
import ProjectsView from './ProjectsView';
import NewProject from './NewProject';
import UserHistory from './UserHistory';
import ProjectDetails from './ProjectDetails';
import { SET_KEY_HOLDER, SET_PROJECTS, SET_LOGIN_STATE, SET_USERS, SET_COMPLETE_PROJECTS, SET_DOCUMENTS, SET_ACTIVE_PROJECTS } from '../store/type';
import { Container } from 'semantic-ui-react';

const App = () => {
  
  const dispatch = useDispatch()
  // const keyHolder = useSelector(state => state.app.keyHolder)
  const isLoggedIn = useSelector(state => state.app.isLoggedIn)

  // Fetch user to keep user logged in
  useEffect(() => {
    if (localStorage.token) {
      const token = localStorage.token
      autoLogin(token)
      .then(loggedInUser => {
        // update state
        dispatch({ type: SET_KEY_HOLDER, payload: loggedInUser })
        dispatch({ type: SET_LOGIN_STATE })
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
      dispatch({ type: SET_ACTIVE_PROJECTS, payload: projectData })
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

  console.log("IS IT LOGGED IN? --->", isLoggedIn) 
  return (
    <div>
      { isLoggedIn ? <Header /> : null}
      <Switch>
        <Container>
        { 
          isLoggedIn && (
            <React.Fragment>
              <Route exact path="/users" render={ () => <UserList hide={false} />} />
              <Route path="/users/:id" render={ () => <Account />} />
              <Route exact path="/projects" render={ () => <ProjectsView />} />
              <Route path="/project/:id" render={ () => <ProjectDetails/>} />
              <Route path='/user/projects/:id' render={() => <UserHistory />} />
              <Route path="/projects/new" render={ () => <NewProject />} />
              <Route path="/admin/:id" render={ () => <Account />} />
            </React.Fragment>
          ) 
        }
          <Route exact path="/" render={ () => <Home/>} />
          <Route path="/signup" render={ () => <Signup/>} />
          <Route path="/login" render={ () => <Login/>} />
          { !isLoggedIn ? <Redirect to="/" /> : <Redirect to="/account" />}
        </Container>
      </Switch>
    </div>
  );
}

export default withRouter(App);