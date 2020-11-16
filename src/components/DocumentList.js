import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { Table, Icon, Button, Header } from 'semantic-ui-react';
import MissingAsset from './MissingAsset';
import Loading from './Loading';
import '../resources/DocumentList.css';

const DocumentList = props => {

  const documents = useSelector(state => state.document.documents)
  const archiveDocuments = useSelector(state => state.archDocument.archDocuments)

  const [ allDocuments, setAllDocuments ] = useState("")
  const [ pathKey, setPathKey ] = useState("")
  const loadDocuments = useSelector(state => state.load.loadDocuments) 
  const matchId = parseInt(props.match.params.id)
  const path = props.match.path.split("/")

  useEffect(() => {
    if (path.includes("archive")) {
      setAllDocuments(archiveDocuments)
      setPathKey("archive_project")
    }
    if (props.match.path.split("/").includes("project")) {
      setAllDocuments(documents)
      setPathKey("project")
    }
  }, [path, allDocuments, archiveDocuments, documents, props.match.path])

  const allArchDocuments = allDocuments && allDocuments.filter(document => document[`${pathKey}`].id === matchId)

  const renderDocuments = () => {
    return documents && allArchDocuments.map(document => (
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
          <Button size='small' compact className="DocumentList-Button-Color" onClick={() => window.open(document.url)}>Open</Button>
        </Table.Cell>
      </Table.Row>
    ))
  }

  return (
        <div id="DocumentList-Container">
          <Header as='h2' className="DocumentList-Header">
            <span>
              <Icon name='attach' size="large" className="DocumentList-Icon-Color"/>
              <Header.Content>
                <span className="DocumentList-Title">Documents</span>
              </Header.Content>
            </span>
          </Header> 
          { 
            loadDocuments ? 
            <Loading loadingClass={false} /> 
            :
            (
              documents && allArchDocuments.length !== 0 ?
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
              </Table> : 
              <MissingAsset message={"No documents"} icon={"pdf file outline"} />
            )
          } 
        </div>
  )
}

export default withRouter(DocumentList);