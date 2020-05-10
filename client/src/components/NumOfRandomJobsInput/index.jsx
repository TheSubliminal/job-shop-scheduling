import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const NumOfRandomJobsInput = ({ numOfRandomJobs, onChange }) => {
  const onInputChange = (event) => {
    const value = parseInt(event.target.value, 10);

    if (isNaN(value) && value < 0) {
      return;
    }

    onChange(value);
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