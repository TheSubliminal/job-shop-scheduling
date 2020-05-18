import React from 'react';
import { Field } from 'formik';
import { FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';

import algorithmsConfig from '../../config/algorithms.json';

const AlgorithmChoice = () => (
  <>
    <Typography>Choose algorithm</Typography>
    <Field name='algorithm'>
      {({ field }) => (
        <RadioGroup
          aria-label='Algorithms'
          {...field}
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
      )}
    </Field>
  </>
);

export default AlgorithmChoice;