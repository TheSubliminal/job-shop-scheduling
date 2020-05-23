import React from 'react';
import { Field } from 'formik';
import { TextField, Typography } from '@material-ui/core';

import styles from './styles.module.scss';

const ExecutionTimeDataForm = () => (
  <>
    <Typography>Number of jobs</Typography>
    <div>
      <Field name='from'>
        {({ field, meta }) => (
          <TextField
            type='number'
            size='small'
            label='From'
            error={!!(meta.touched && meta.error)}
            helperText={meta.touched && meta.error}
            className={styles.input}
            {...field}
          />
        )}
      </Field>
      <Field name='to'>
        {({ field, meta }) => (
          <TextField
            type='number'
            size='small'
            label='To'
            error={!!(meta.touched && meta.error)}
            helperText={meta.touched && meta.error}
            className={styles.input}
            {...field}
          />
        )}
      </Field>
      <Field name='step'>
        {({ field, meta }) => (
          <TextField
            type='number'
            size='small'
            label='Step'
            error={!!(meta.touched && meta.error)}
            helperText={meta.touched && meta.error}
            className={styles.input}
            {...field}
          />
        )}
      </Field>
    </div>
  </>
);

export default ExecutionTimeDataForm;