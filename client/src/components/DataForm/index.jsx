import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  FormHelperText,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@material-ui/core';

import InputDataTable from '../InputDataTable';
import NumOfRandomJobsInput from '../NumOfRandomJobsInput';
import problem10jobs from '../../config/problems/problem10jobs.json';
import problem20jobs from '../../config/problems/problem20jobs.json';
import problem35jobs from '../../config/problems/problem35jobs.json';

import styles from './styles.module.scss';

const predefinedProblems = [
  {
    jobs: problem10jobs,
    name: 'problem10jobs.json'
  },
  {
    jobs: problem20jobs,
    name: 'problem20jobs.json'
  },
  {
    jobs: problem35jobs,
    name: 'problem35jobs.json'
  }
];

const DataForm = ({ jobs, isRandom, setJobs }) => {
  const [fileError, setFileError] = useState(null);
  const [predefinedProblem, setPredefinedProblem] = useState('');

  const onChangePredefinedProblem = (event) => {
    const value = event.target.value;
    setPredefinedProblem(value);

    if (value) {
      const { jobs } = predefinedProblems.find(({ name }) => name === value);
      setJobs(jobs);
    }
  };

  const onFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const fileReader = new FileReader();

    fileReader.addEventListener('load', () => {
      const fileContent = fileReader.result;
      validateAndSubmitFileContent(fileContent);
    });

    fileReader.readAsText(file);
  };

  const validateAndSubmitFileContent = (fileContent) => {
    try {
      const jobData = JSON.parse(fileContent);
      const areJobsValid = validateJobData(jobData);

      if (!areJobsValid) {
        setFileError('All jobs should contain duration and deadline data');
      } else {
        setJobs(jobData);
        setFileError(null);
      }
    } catch (error) {
      setFileError('Invalid JSON format');
    }
  };

  const validateJobData = (dataObject) => {
    return Array.isArray(dataObject) && dataObject.length && dataObject.every((job) => {
      const { duration, deadline } = job;

      return !isNaN(duration) && !isNaN(deadline);
    });
  };

  return (
    <>
      <div>
        <Typography>Fill input data</Typography>
        <Field name='isRandom'>
          {({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.value}
                  {...field}
                />
              }
              label='Use random data'
            />
          )}
        </Field>
        <input
          id='file-upload'
          type='file'
          accept='.json'
          className={styles.fileUpload}
          onChange={onFileUpload}
        />
        <label htmlFor='file-upload'>
          <Button
            color='primary'
            component='span'
            variant='contained'
          >
            Upload from .JSON
          </Button>
        </label>
        <br />
        <FormControl className={styles.predefinedProblemSelect}>
          <InputLabel>Select problem</InputLabel>
          <Select
            size='small'
            value={predefinedProblem}
            onChange={onChangePredefinedProblem}
          >
            {predefinedProblems.map(({ name }) => (
              <MenuItem key={name} value={name}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {fileError && (
          <FormHelperText error>
            {fileError}
          </FormHelperText>
        )}
      </div>
      {isRandom
        ? <NumOfRandomJobsInput />
        : <InputDataTable jobs={jobs} />
      }
    </>
  );
};

const jobPropType = PropTypes.exact({
  duration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  deadline: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
});

DataForm.propTypes = {
  jobs: PropTypes.arrayOf(jobPropType).isRequired,
  isRandom: PropTypes.bool.isRequired,
  setJobs: PropTypes.func.isRequired
};

export default DataForm;