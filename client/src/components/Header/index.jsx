import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';

import styles from './styles.module.scss';

const Header = () => (
  <AppBar position='sticky'>
    <Container disableGutters>
      <Toolbar variant='dense'>
        <Typography className={styles.navLink}>
          <NavLink to='/' exact activeClassName={styles.active}>
            Home
          </NavLink>
        </Typography>
        <Typography className={styles.navLink}>
          <NavLink to='/experiments' activeClassName={styles.active}>
            Experiments
          </NavLink>
        </Typography>
      </Toolbar>
    </Container>
  </AppBar>
);

export default Header;