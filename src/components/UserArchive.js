import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Header, Icon, List } from 'semantic-ui-react';
import Loading from './Loading';
import MissingAsset from './MissingAsset';
import '../resources/UserHistory.css';

const UserArchive = props => { 

  const matchId = parseInt(props.match.params.id)
  const [ loadArchive, setLoadArchive ] = useState(true)
  const archiveProjects = useSelector(state => state.archiveProject.archive)
  const users = useSelector(state => state.user.users)
  const [ viewer, setViewer ] = useState(null)

  useEffect(() => {
    setLoadArchive(!archiveProjects)
    const u = users.find(user => user.id === matchId)
    setViewer(u)
  }, [loadArchive, users, viewer, archiveProjects, matchId])

  const userArchive = () => {
    return archiveProjects.filter(archv => archv.users.find(user => user.id === matchId) && archv)
  }

  const renderArchiveProjects = () => {
    return userArchive().map(project => (
      <List.Item key={project.id} className="UserHistory-List-Item Archived-Project">
        <List.Icon name="check circle" size='large' verticalAlign='middle' className="UserHistory-Icon-Color" />
        <List.Content>
          <List.Header as={Link} to={`/archive/${project.id}`} className="UserHistory-Project-Name">{project.name}</List.Header>
          <List.Description as='a'className="UserHistory-Project-Date">Start date: {project.start_date} | Due date: {project.due_date}</List.Description>
        </List.Content>
      </List.Item>
    ))
  }

  return (
    <React.Fragment>
      <List divided relaxed>
      <Header as='h2' className="UserHistory-Header-Align-Items">
        <span>
          <Icon name='archive' size="large" className="UserHistory-Icon-Color"/>
          <Header.Content>
            Archive
          </Header.Content>
        </span>
      </Header> 
      { loadArchive ? <Loading loadingClass={false} /> : renderArchiveProjects().length !== 0 ? renderArchiveProjects() : <MissingAsset message={"Nothing in the arquive"} icon={"folder open outline"} /> }
      </List>
    </React.Fragment>
  );
}

export default withRouter(UserArchive);