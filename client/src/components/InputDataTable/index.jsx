import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'formik';
import { IconButton, Table, TableHead, TableBody, TableRow, TableCell, TableFooter } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import InputTableRow from './InputTableRow';
import defaults from '../../config/default.json';

import styles from './styles.module.scss';

const defaultJob = {
  duration: defaults.duration,
  deadline: defaults.deadline
};

const InputDataTable = ({ jobs }) => (
  <>
    <Table size='small'>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Duration</TableCell>
          <TableCell>Deadline</TableCell>
          {jobs.length > 1 && <TableCell />}
        </TableRow>
      </TableHead>
      <FieldArray
        name='jobs'
        render={(arrayHelpers) => (
          <>
            <TableBody>
              {jobs.map((job, index) => (
                <InputTableRow
                  key={index}
                  index={index}
                  canDelete={jobs.length > 1}
                  onRemove={() => arrayHelpers.remove(index)}
                />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className={styles.addButtonCell}>
                  <IconButton
                    aria-label='Add job'
                    onClick={() => arrayHelpers.push(defaultJob)}
                  >
                    <AddIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableFooter>
          </>
        )}
      />
    </Table>
  </>
);

const jobPropType = PropTypes.exact({
  duration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  deadline: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
});

InputDataTable.propTypes = {
  jobs: PropTypes.arrayOf(jobPropType).isRequired
};

export default InputDataTable;