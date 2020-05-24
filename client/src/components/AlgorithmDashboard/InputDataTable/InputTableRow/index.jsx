import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { TableRow, TableCell, TextField, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const InputTableRow = ({ index, canDelete, onRemove }) => (
  <TableRow>
    <TableCell>
      {index + 1}
    </TableCell>
    <TableCell>
      <Field name={`jobs.${index}.duration`}>
        {({ field, meta }) => (
          <TextField
            type='number'
            size='small'
            error={!!(meta.touched && meta.error)}
            helperText={meta.touched && meta.error}
            {...field}
          />
        )}
      </Field>
    </TableCell>
    <TableCell>
      <Field name={`jobs.${index}.deadline`}>
        {({ field, meta }) => (
          <TextField
            type='number'
            size='small'
            error={!!(meta.touched && meta.error)}
            helperText={meta.touched && meta.error}
            {...field}
          />
        )}
      </Field>
    </TableCell>
    {canDelete && (
      <TableCell>
        <IconButton onClick={onRemove}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    )}
  </TableRow>
);

InputTableRow.propTypes = {
  index: PropTypes.number.isRequired,
  canDelete: PropTypes.bool.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default InputTableRow;