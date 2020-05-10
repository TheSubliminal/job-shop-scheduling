import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, TextField, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const JobTableRow = ({ job, onDurationChange, onDeadlineChange, onRemove }) => {
  const editable = onDurationChange && onDeadlineChange;

  return (
    <TableRow>
      <TableCell>
        {job.id}
      </TableCell>
      <TableCell>
        {editable
          ? (
            <TextField
              value={job.duration}
              type='number'
              label='Duration'
              size='small'
              onChange={onDurationChange}
            />
          )
          : job.duration}
      </TableCell>
      <TableCell>
        {editable
          ? (
            <TextField
              value={job.deadline}
              type='number'
              label='Deadline'
              size='small'
              onChange={onDeadlineChange}
            />
          )
          : job.duration}
      </TableCell>
      {editable && (
        <TableCell>
          <IconButton onClick={onRemove}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      )}

    </TableRow>
  );
};

JobTableRow.propTypes = {
  job: PropTypes.exact({
    id: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    deadline: PropTypes.number.isRequired
  }).isRequired,
  onDurationChange: PropTypes.func,
  onDeadlineChange: PropTypes.func,
  onRemove: PropTypes.func
};

export default JobTableRow;