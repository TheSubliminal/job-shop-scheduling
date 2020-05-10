import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const NumOfRandomJobsInput = ({ numOfRandomJobs, onChange }) => {
  const onInputChange = (event) => {
    const value = event.target.value;

    if (value > 0) {
      onChange(value);
    }
  };

  return (
    <TextField
      required
      value={numOfRandomJobs}
      label='Number of random jobs'
      type='number'
      variant='outlined'
      onChange={onInputChange}
    />
  );
};

NumOfRandomJobsInput.propTypes = {
  numOfRandomJobs: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default NumOfRandomJobsInput;