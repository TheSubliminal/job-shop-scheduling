import React from 'react';
import { Field } from 'formik';
import { FormControlLabel, Checkbox, FormGroup, Typography } from '@material-ui/core';

import algorithmsConfig from '../../config/algorithms.json';

const AlgorithmChoice = () => (
  <>
    <Typography>Choose algorithm</Typography>
    <FormGroup>
      {Object.values(algorithmsConfig).map(({ key, name }) => (
        <Field key={key} name={key}>
          {({ field }) =>  (
            <FormControlLabel
              control={<Checkbox checked={field.value} {...field} />}
              label={name}
            />
          )}
        </Field>
      ))}
    </FormGroup>
  </>
);

export default AlgorithmChoice;