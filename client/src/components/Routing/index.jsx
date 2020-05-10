import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AlgorithmDashboard from '../AlgorithmDashboard';

const Routing = () => (
  <Switch>
    <Route exact path='/'>
      <AlgorithmDashboard />
    </Route>
  </Switch>
);

export default Routing;