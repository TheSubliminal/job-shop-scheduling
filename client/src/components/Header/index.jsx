import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import styles from './styles.module.scss';

const Header = () => (
  <AppBar position='sticky'>
    <Toolbar variant='dense'>
      <Typography className={styles.navLink}>
        <NavLink to='/' exact activeClassName={styles.active}>
          Home
        </NavLink>
      </Typography>
      <Typography className={styles.navLink}>
        <NavLink to='/stats' activeClassName={styles.active}>
          Algorithm test results
        </NavLink>
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;