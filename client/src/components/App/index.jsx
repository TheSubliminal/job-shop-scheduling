import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routing from '../Routing';

const App = () => (
  <React.StrictMode>
    <Router>
      <Routing />
    </Router>
  </React.StrictMode>
);

export default App;
