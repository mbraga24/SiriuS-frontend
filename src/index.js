import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import './resources/index.css';
import store from './store';
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <Router>
          <App />
        </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);