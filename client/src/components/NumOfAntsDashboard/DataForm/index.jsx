import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Field } from 'formik';

import styles from './styles.module.scss';

const NumOfJobsDataForm = () => (
  <>
    <Typography>Number of ants</Typography>
    <div>
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
    </div>
    <Typography>Number of random jobs</Typography>
    <div>
      <Field name='numOfRandomJobs'>
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
    <Typography>Pheromone Significance Coefficient</Typography>
    <div>
      <Field name='pheromoneSignificanceCoef'>
        {({ field, meta }) => (
          <TextField
            type='number'
            label='Pheromone Significance Coef'
            size='small'
            error={!!(meta.touched && meta.error)}
            helperText={meta.touched && meta.error}
            className={styles.input}
            {...field}
          />
        )}
      </Field>
    </div>
    <Typography>Heuristic Significance Coefficient</Typography>
    <div>
      <Field name='heuristicSignificanceCoef'>
        {({ field, meta }) => (
          <TextField
            type='number'
            label='Heuristic Significance Coef'
            size='small'
            error={!!(meta.touched && meta.error)}
            helperText={meta.touched && meta.error}
            className={styles.input}
            {...field}
          />
        )}
      </Field>
    </div>
    <Typography>Pheromone Evaporation Coefficient</Typography>
    <div>
      <Field name='pheromoneEvaporationCoef'>
        {({ field, meta }) => (
          <TextField
            type='number'
            label='Pheromone Evaporation Coef'
            size='small'
            error={!!(meta.touched && meta.error)}
            helperText={meta.touched && meta.error}
            className={styles.input}
            {...field}
          />
        )}
      </Field>
    </div>
    <Typography>Max job duration</Typography>
    <div>
      <Field name='maxJobDuration'>
        {({ field, meta }) => (
          <TextField
            type='number'
            label='Max Job Duration'
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

export default NumOfJobsDataForm;