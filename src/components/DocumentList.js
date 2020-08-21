import React from 'react';
import { Table, Icon, Button, Header, Container } from 'semantic-ui-react';
import '../resources/DocumentList.css';

const DocumentList = () => {
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
          <Table basic className="DocumentList-Table">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Posted</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body className="DocumentList-Table-Body">
              <Table.Row>
                <Table.Cell>
                  <Icon name='folder' />
                  js
                </Table.Cell>
                <Table.Cell>
                  error on send
                </Table.Cell>
                <Table.Cell>
                  10 hours ago
                </Table.Cell>
                <Table.Cell>
                  <Button size='small' compact className="DocumentList-Button-Color" disabled>Open</Button>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Icon name='folder' />
                  chat feature
                </Table.Cell>
                <Table.Cell>
                  chat feature attempt 2
                </Table.Cell>
                <Table.Cell>
                  7 hours ago
                </Table.Cell>
                <Table.Cell>
                  <Button size='small' compact className="DocumentList-Button-Color" disabled>Open</Button>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Icon name='folder' />
                  pdf
                </Table.Cell>
                <Table.Cell>
                  request for contacts
                </Table.Cell>
                <Table.Cell>
                  2 days ago
                </Table.Cell>
                <Table.Cell>
                  <Button size='small' compact className="DocumentList-Button-Color" disabled>Open</Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Container>
  
  )
}

export default DocumentList;