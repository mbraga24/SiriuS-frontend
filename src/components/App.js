import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { autoLogin, getProjects, getUsers, getDocuments, getInvites, getArchivedProjects, getArchiveDocuments } from '../api';
import Navbar from './Navbar';
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
import UpdateAccount from './UpdateAccount';
import { SET_ARCH_DOCS, API_SUCCESS, SET_KEY_HOLDER, SET_PROJECTS, SET_USERS, SET_DOCUMENTS, SET_INVITATIONS, SET_ARCHIVE } from '../store/type';
import { Container } from 'semantic-ui-react';

const App = props => {
  
  const dispatch = useDispatch()
  const keyHolder = useSelector(state => state.app.keyHolder)
  const pathname = props.location.pathname

  // Fetch user to keep user logged in
  useEffect(() => {
    if (localStorage.token) {
      // const token = localStorage.token
      const requestId = "keyHolder";
      autoLogin()
      .then(user => {
        dispatch({ requestId, type: API_SUCCESS });
        dispatch({ type: SET_KEY_HOLDER, payload: user })
      })
      // change body background color
     const body = document.querySelector('body')
     body.classList.remove("bg-color-home")
    }

  }, [dispatch]) 

  // Fetch Projects
  useEffect(() => {
    const requestId = "projects";
    getProjects()
    .then(projectData  => {
      dispatch({ requestId, type: API_SUCCESS });
      dispatch({ type: SET_PROJECTS, payload: projectData })
    })
  }, [dispatch])

  // Fetch Documents
  useEffect(() => {
    const requestId = "documents";
    getDocuments()
    .then(docuData  => {
      dispatch({ requestId, type: API_SUCCESS });
      dispatch({ type: SET_DOCUMENTS, payload: docuData })
    })
  }, [dispatch])

  // Fetch Users
  useEffect(() => {
    const requestId = "users";
    getUsers()
    .then(userData => {
      dispatch({ requestId, type: API_SUCCESS });
      dispatch({ type: SET_USERS, payload: userData })
    })
  }, [dispatch])

    // Fetch Invites
    useEffect(() => {
      const requestId = "invites";
      getInvites()
      .then(inviteData => {
        dispatch({ requestId, type: API_SUCCESS });
        dispatch({ type: SET_INVITATIONS, payload: inviteData })
      })
    }, [dispatch])

    // Fetch Archive
    useEffect(() => {
      const requestId = "archive";
      getArchivedProjects()
      .then(archiveData => {
        dispatch({ requestId, type: API_SUCCESS });
        dispatch({ type: SET_ARCHIVE, payload: archiveData })
      })
    }, [dispatch])
    
    // Fetch Archive Document
    useEffect(() => {
      const requestId = "archiveDocuments";
      getArchiveDocuments()
      .then(archiveDocData => {
        dispatch({ requestId, type: API_SUCCESS });
        dispatch({ type: SET_ARCH_DOCS, payload: archiveDocData })
      })
    }, [dispatch])

  return (
    <div>
      { keyHolder ? <Navbar /> : null}
      <Switch>
        <Container>
        { 
          keyHolder &&
            <React.Fragment>
              <Route exact path="/users" render={ () => <UserList hide={false} />} />
              <Route path="/users/:id" render={ () => <Account />} />
              <Route exact path="/projects" render={ () => <ProjectList />} />
              <Route path={["/project/:id", "/archive/:id"]} render={ () => <ProjectDetails/>} />
              <Route path='/user/projects/:id' render={() => <UserHistory />} />
              <Route path="/projects/new" render={ () => <NewProject />} />
              <Route path="/invite-user" render={ () => <InvitationForm />} />
              <Route path="/invitations" render={ () => <InviteList />} />
              <Route path="/update-account/:id" render={ () => <UpdateAccount />} />
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