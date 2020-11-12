import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { autoLogin, getProjects, getUsers, getDocuments } from '../api';
import MenuBar from './MenuBar';
import Home from './Home';
import UserList from './UserList';
import Login from './Login';
import Signup from './Signup';
import Account from './Account';
import ProjectList from './ProjectList';
import NewProject from './NewProject';
import UserHistory from './UserHistory';
import ProjectDetails from './ProjectDetails';
import InvitationForm from './InvitationForm';
import { LOAD_DOCUMENTS, LOAD_KEYHOLDER, LOAD_USERS, LOAD_PROJECTS, SET_KEY_HOLDER, SET_PROJECTS, SET_USERS, SET_COMPLETE_PROJECTS, SET_DOCUMENTS, SET_ACTIVE_PROJECTS } from '../store/type';
import { Container } from 'semantic-ui-react';

const App = props => {
  
  const dispatch = useDispatch()
  const keyHolder = useSelector(state => state.app.keyHolder)
  const pathname = props.location.pathname

  // Fetch user to keep user logged in
  useEffect(() => {
    if (localStorage.token) {
      const token = localStorage.token
      autoLogin(token)
      .then(user => {
        // update state
        dispatch({ type: SET_KEY_HOLDER, payload: user })
        dispatch({ type: LOAD_KEYHOLDER, payload: false })
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
      dispatch({ type: LOAD_PROJECTS, payload: false })
    })
  }, [dispatch])

  // Fetch documents
  useEffect(() => {
    getDocuments()
    .then(docuData  => {
      dispatch({ type: SET_DOCUMENTS, payload: docuData })
      dispatch({ type: LOAD_DOCUMENTS, payload: false })
    })
  }, [dispatch])

  // Fetch users
  useEffect(() => {
    getUsers()
    .then(usersData => {
      dispatch({ type: SET_USERS, payload: usersData })
      dispatch({ type: LOAD_USERS, payload: false })
      console.log("LOAD USERS ->", usersData)
    })
  }, [dispatch])

  console.log("APP PATH -->", pathname)

  return (
    <div>
      { keyHolder ? <MenuBar /> : null}
      <Switch>
        <Container>
        { 
          keyHolder &&
            <React.Fragment>
              <Route exact path="/users" render={ () => <UserList hide={false} />} />
              <Route path="/users/:id" render={ () => <Account />} />
              <Route exact path="/projects" render={ () => <ProjectList />} />
              <Route path="/project/:id" render={ () => <ProjectDetails/>} />
              <Route path='/user/projects/:id' render={() => <UserHistory />} />
              <Route path="/projects/new" render={ () => <NewProject />} />
              <Route path="/invite-user" render={ () => <InvitationForm />} />
              <Redirect render={ () => <Account /> } />
            </React.Fragment>
        }
          <Route exact path="/" render={ () => <Home/>} />
          <Route path="/signup" render={ () => <Signup/>} />
          <Route path="/login" render={ () => <Login/>} />
          { !keyHolder && pathname !== "/signup" && <Redirect to="/"/>  }
        </Container>
      </Switch>
    </div>
  );
}

export default withRouter(App);