import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header';
import AlgorithmDashboard from '../AlgorithmDashboard';
import Stats from '../Stats';

const Routing = () => (
  <>
    <Header />
    <Switch>
      <Route exact path='/'>
        <AlgorithmDashboard />
      </Route>
      <Route exact path='/stats'>
        <Stats />
      </Route>
    </Switch>
  </>
);

export default Routing;