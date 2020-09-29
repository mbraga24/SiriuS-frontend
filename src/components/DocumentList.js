import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { Table, Icon, Button, Header, Container } from 'semantic-ui-react';
import MissingAsset from './MissingAsset';
import '../resources/DocumentList.css';

const DocumentList = props => {

  const documents = useSelector(state => state.document.documents)
  const matchId = parseInt(props.match.params.id)
  const store = props.match.url.split("/")[1]

  // collect all the documents that belong to this project 
  const projectDocuments = () => {
    return documents.filter(document => document[`${store}`].id === matchId)
  }

  const renderDocuments = () => {
    return projectDocuments().map(document => (
      <Table.Row key={document.id}>
        <Table.Cell>
          <Icon name='folder' />
          {document.name}
        </Table.Cell>
        <Table.Cell>
          {document.user.first_name} {document.user.last_name}
        </Table.Cell>
        <Table.Cell>
          {document.created_at}
        </Table.Cell>
        <Table.Cell>
          <Button size='small' compact className="DocumentList-Button-Color" href={`${document.url}`}>Open</Button>
        </Table.Cell>
      </Table.Row>
    ))
  }

  return (
        <Container id="DocumentList-Container">
          <Header as='h2' className="DocumentList-Header">
            <span>
              <Icon name='attach' size="large" className="DocumentList-Icon-Color"/>
              <Header.Content>
                <span className="DocumentList-Title">Documents</span>
              </Header.Content>
            </span>
          </Header>
          { projectDocuments().length !== 0 ?
           ( 
            <Table basic className="DocumentList-Table">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Collaborator</Table.HeaderCell>
                  <Table.HeaderCell>Posted</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body className="DocumentList-Table-Body">
                { renderDocuments() }
              </Table.Body>
            </Table>
            ) 
            :
            (
              <MissingAsset message={props.message} icon={props.icon} displayUrl={props.displayUrl} />
            )
          } 
        </Container>
  )
}

export default withRouter(DocumentList);