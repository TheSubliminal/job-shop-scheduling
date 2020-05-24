import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import Header from '../Header';
import AlgorithmDashboard from '../AlgorithmDashboard';
import Stats from '../Stats';

import styles from './styles.module.scss';

const Routing = () => (
  <>
    <Header />
    <Container className={styles.appContainer}>
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