import React from 'react';
import { Field } from 'formik';
import { TextField, Typography } from '@material-ui/core';

import FromToStepFields from '../../FromToStepFields';

const JobDurationDataForm = () => (
  <>
    <Typography>Job duration</Typography>
    <FromToStepFields />
    <Typography>Number of jobs in each experiment</Typography>
    <div>
      <Field name='numOfJobsInExperiment'>
        {({ field, meta }) => (
          <TextField
            type='number'
            size='small'
            label='Number of jobs'
            error={!!(meta.touched && meta.error)}
            helperText={meta.touched && meta.error}
            {...field}
          />
        )}
      </Field>
    </div>
  </>
);

export default JobDurationDataForm;