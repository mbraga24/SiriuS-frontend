import React from 'react';
import { withRouter } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react';
import '../resources/MissingAsset.css';

const MissingAsset = props => {

  return (
    <div id="MissingAsset-Container">
      <Header icon size="small">
        <Icon name={props.icon} />
        {`${props.message}`}
      </Header>
    </div>
  )
}

export default withRouter(MissingAsset);