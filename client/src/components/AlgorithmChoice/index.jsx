import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { FormControlLabel, Checkbox, FormGroup, Typography } from '@material-ui/core';

import ACOAdditionalData from '../ACOAdditionalData';
import algorithmsConfig from '../../config/algorithms.json';

const AlgorithmChoice = ({ isACO }) => (
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
    {isACO && <ACOAdditionalData />}
  </>
);

AlgorithmChoice.propTypes = {
  isACO: PropTypes.bool
};

export default AlgorithmChoice;