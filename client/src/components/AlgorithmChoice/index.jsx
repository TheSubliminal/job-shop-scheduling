import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';

import algorithmsConfig from '../../config/algorithms.json';

const AlgorithmChoice = ({ selectedAlgorithm, onSelectAlgorithm }) => {
  const onChange = (event) => {
    const value = event.target.value;
    onSelectAlgorithm(value);
  };

  return (
    <>
      <Typography>Choose algorithm</Typography>
      <RadioGroup
        aria-label='Algorithms'
        value={selectedAlgorithm}
        name='algorithm'
        onChange={onChange}
      >
        {Object.values(algorithmsConfig).map(({ key, name }) => (
          <FormControlLabel
            key={key}
            value={key}
            control={<Radio />}
            label={name}
          />
        ))}
      </RadioGroup>
    </>
  );
};

AlgorithmChoice.propTypes = {
  selectedAlgorithm: PropTypes.string,
  onSelectAlgorithm: PropTypes.func.isRequired
};

export default AlgorithmChoice;