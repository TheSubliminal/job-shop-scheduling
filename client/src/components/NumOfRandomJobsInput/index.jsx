import React from 'react';
import { Field } from 'formik';
import TextField from '@material-ui/core/TextField';

import styles from './styles.module.scss';

const NumOfRandomJobsInput = () => (
  <Field name='numOfRandomJobs'>
    {({ field, meta }) => (
      <TextField
        label='Number of random jobs'
        type='number'
        size='small'
        required
        error={!!(meta.touched && meta.error)}
        helperText={meta.touched && meta.error}
        className={styles.numOfRandomJobs}
        {...field}
      />
    )}
  </Field>
);

export default NumOfRandomJobsInput;