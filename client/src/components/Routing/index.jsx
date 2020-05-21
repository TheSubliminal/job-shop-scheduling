import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import Header from '../Header';
import AlgorithmDashboard from '../AlgorithmDashboard';
import Stats from '../Stats';

const Routing = () => (
  <>
    <Header />
    <Container>
      <Switch>
        <Route exact path='/'>
          <AlgorithmDashboard />
        </Route>
        <Route exact path='/stats'>
          <Stats />
        </Route>
      </Switch>
    </Container>
  </>
);

export default Routing;