import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

import styles from './styles.module.scss';

const ResultDataTable = ({ schedule, totalDelay }) => (
  <Table size='small'>
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Duration</TableCell>
        <TableCell>Deadline</TableCell>
        <TableCell>Delay</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {schedule.map(({ id, duration, deadline, delay }) => (
        <TableRow key={id}>
          <TableCell>{id}</TableCell>
          <TableCell>{duration}</TableCell>
          <TableCell>{deadline}</TableCell>
          <TableCell>{delay}</TableCell>
        </TableRow>
      ))}
      <TableRow>
        <TableCell />
        <TableCell />
        <TableCell className={styles.totalDelayLabel}>
          Total delay:
        </TableCell>
        <TableCell>{totalDelay}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

const jobPropType = PropTypes.exact({
  id: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  deadline: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  delay: PropTypes.number.isRequired
});

ResultDataTable.propTypes = {
  schedule: PropTypes.arrayOf(jobPropType).isRequired,
  totalDelay: PropTypes.number.isRequired
};

export default ResultDataTable;
