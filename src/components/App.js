import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchUsers,
  fetchProjects,
  fetchDocuments,
  fetchInvitations,
  fetchArchivedProjects,
  fetchArchivedDocuments
} from '../store/thunks/asyncThunks';
import { autoLogin } from '../api';
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
import { API_SUCCESS, SET_KEY_HOLDER } from '../store/type';
import { Container } from 'semantic-ui-react';

const App = props => {
  
  const dispatch = useDispatch()
  const keyHolder = useSelector(state => state.app.keyHolder)
  const pathname = props.location.pathname

  // Fetch user to keep user logged in
  useEffect(() => {
    if (localStorage.token) {
      const requestId = "keyHolder";
      autoLogin()
      .then(user => {
        dispatch({ requestId, type: API_SUCCESS });
        dispatch({ type: SET_KEY_HOLDER, payload: user })
      })
      .catch(error => {
        console.error('Auto login failed:', error);
        localStorage.removeItem('token');
      })
      // change body background color
     const body = document.querySelector('body')
     body.classList.remove("bg-color-home")
    }
  }, [dispatch]) 

  // Fetch data using async thunks
  useEffect(() => {
    if (localStorage.token) {
      // Dispatch async thunks with proper promise handling
      dispatch(fetchUsers())
        .unwrap()
        .then(() => dispatch({ requestId: "users", type: API_SUCCESS }))
        .catch(err => console.error('fetchUsers failed:', err));
      
      dispatch(fetchProjects())
        .unwrap()
        .then(() => dispatch({ requestId: "projects", type: API_SUCCESS }))
        .catch(err => console.error('fetchProjects failed:', err));
      
      dispatch(fetchDocuments())
        .unwrap()
        .then(() => dispatch({ requestId: "documents", type: API_SUCCESS }))
        .catch(err => console.error('fetchDocuments failed:', err));
      
      dispatch(fetchInvitations())
        .unwrap()
        .then(() => dispatch({ requestId: "invites", type: API_SUCCESS }))
        .catch(err => console.error('fetchInvitations failed:', err));
      
      dispatch(fetchArchivedProjects())
        .unwrap()
        .then(() => dispatch({ requestId: "archive", type: API_SUCCESS }))
        .catch(err => console.error('fetchArchivedProjects failed:', err));
      
      dispatch(fetchArchivedDocuments())
        .unwrap()
        .then(() => dispatch({ requestId: "archiveDocuments", type: API_SUCCESS }))
        .catch(err => console.error('fetchArchivedDocuments failed:', err));
    }
  }, [dispatch]);

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
              <Route path="/my-account" render={ () => <Account />} />
              <Route exact path="/projects" render={ () => <ProjectList />} />
              <Route path={["/project/:id", "/archive/:id"]} render={ () => <ProjectDetails/>} />
              <Route path='/user/projects/:id' render={() => <UserHistory />} />
              <Route path="/projects/new" render={ () => <NewProject />} />
              <Route path="/invite-user" render={ () => <InvitationForm />} />
              <Route path="/invitations" render={ () => <InviteList />} />
              <Route path="/update-account/:id" render={ () => <UpdateAccount />} />
            </React.Fragment>
        }
          <Route exact path="/" render={ () => keyHolder?.id ? <Redirect to="/my-account" /> : <Home/>} />
          <Route path="/signup" render={ () => <Signup/>} />
          <Route path="/login" render={ () => <Login/>} />
          { (!keyHolder && pathname !== "/signup" && pathname !== "/login") && <Redirect to="/"/>  }
        </Container>
      </Switch>
    </div>
  );
}

export default withRouter(App);