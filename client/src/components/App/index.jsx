import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Routing from '../Routing';
import store from '../../store';

const App = () => (
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routing />
      </Router>
    </Provider>
  </React.StrictMode>
);

export default App;
