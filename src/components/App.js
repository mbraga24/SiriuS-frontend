import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { autoLogin, getProjects, getUsers, getDocuments, getInvites, getArquivedProjects } from '../api';
import MenuBar from './MenuBar';
import Home from './Home';
import UserList from './UserList';
import InviteList from './InviteList';
import Login from './Login';
import Signup from './Signup';
import Account from './Account';
import ProjectList from './ProjectList';
import NewProject from './NewProject';
import UserHistory from './UserHistory';
import ProjectDetails from './ProjectDetails';
import InvitationForm from './InvitationForm';
import { LOAD_ARQUIVES, LOAD_DOCUMENTS, LOAD_KEYHOLDER, LOAD_USERS, LOAD_PROJECTS, LOAD_INVITATIONS, SET_KEY_HOLDER, SET_PROJECTS, SET_USERS, SET_COMPLETE_PROJECTS, SET_DOCUMENTS, SET_ACTIVE_PROJECTS, SET_INVITATIONS, SET_ARQUIVE } from '../store/type';
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
     body.classList.remove("bg-color-home")
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
    .then(userData => {
      dispatch({ type: SET_USERS, payload: userData })
      dispatch({ type: LOAD_USERS, payload: false })
    })
  }, [dispatch])

    // Fetch users
    useEffect(() => {
      getInvites()
      .then(inviteData => {
        dispatch({ type: SET_INVITATIONS, payload: inviteData })
        dispatch({ type: LOAD_INVITATIONS, payload: false })
      })
    }, [dispatch])

    // Fetch users
    useEffect(() => {
      getArquivedProjects()
      .then(arquiveData => {
        console.log("arquiveData -->", arquiveData)
        dispatch({ type: SET_ARQUIVE, payload: arquiveData })
        dispatch({ type: LOAD_ARQUIVES, payload: false })
      })
    }, [dispatch])

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
              <Route path={["/project/:id", "/arquive/:id"]} render={ () => <ProjectDetails/>} />
              <Route path='/user/projects/:id' render={() => <UserHistory />} />
              <Route path="/projects/new" render={ () => <NewProject />} />
              <Route path="/invite-user" render={ () => <InvitationForm />} />
              <Route path="/invitations" render={ () => <InviteList />} />
              {/* <Redirect to={`/users/${keyHolder.id}`} /> */}
            </React.Fragment>
        }
          <Route exact path="/" render={ () => <Home/>} />
          <Route path="/signup" render={ () => <Signup/>} />
          <Route path="/login" render={ () => <Login/>} />
          { (!keyHolder && pathname !== "/signup" && pathname !== "/login") && <Redirect to="/"/>  }
        </Container>
      </Switch>
    </div>
  );
}

export default withRouter(App);