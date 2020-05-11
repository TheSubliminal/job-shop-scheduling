import React from 'react';
import { Field } from 'formik';
import { TextField, Typography } from '@material-ui/core';

import styles from './styles.module.scss';

const ACOAdditionalData = () => (
  <>
    <Typography>Fill in additional data</Typography>
    <div className={styles.inputsContainer}>
      <Field name='numOfAnts'>
        {({ field, meta }) => (
          <TextField
            type='number'
            label='Number of ants'
            size='small'
            required
            error={!!(meta.touched && meta.error)}
            helperText={meta.touched && meta.error}
            {...field}
          />
        )}
      </Field>
      <Field name='pheromoneSignificanceCoef'>
        {({ field, meta }) => (
          <TextField
            type='number'
            label='Pheromone Significance Coefficient'
            size='small'
            error={!!(meta.touched && meta.error)}
            helperText={meta.touched && meta.error}
            {...field}
          />
        )}
      </Field>
      <Field name='heuristicSignificanceCoef'>
        {({ field, meta }) => (
          <TextField
            type='number'
            label='Heuristic Significance Coefficient'
            size='small'
            error={!!(meta.touched && meta.error)}
            helperText={meta.touched && meta.error}
            {...field}
          />
        )}
      </Field>
      <Field name='pheromoneEvaporationCoef'>
        {({ field, meta }) => (
          <TextField
            type='number'
            label='Pheromone Evaporation Coefficient'
            size='small'
            error={!!(meta.touched && meta.error)}
            helperText={meta.touched && meta.error}
            {...field}
          />
        )}
      </Field>
    </div>
  </>
);

export default ACOAdditionalData;