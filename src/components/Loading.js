import React from 'react';
import { Loader } from "semantic-ui-react";
import '../resources/Loading.css';

const Loading = props => {
  return (
    <div className={props.loadingClass ? "Loading" : null }>
      <Loader active inline='centered' size='large'>Loading</Loader>
    </div>
  )
}

export default Loading;