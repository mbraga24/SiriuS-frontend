import React from 'react';
import { Dimmer, Loader } from "semantic-ui-react";
import '../resources/Loading.css';

const Loading = () => {
  return (
    <div className="Loading">
      <Dimmer active inverted>
        <Loader size='large'>Loading</Loader>
      </Dimmer>
    </div>
  )
}

export default Loading;