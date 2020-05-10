import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, FormControlLabel } from '@material-ui/core';

import InputDataTable from '../JobDataTable';
import NumOfRandomJobsInput from '../NumOfRandomJobsInput';
import defaults from '../../config/default.json';

const DataForm = ({ onSaveJobData }) => {
  const [isRandom, setIsRandom] = useState(false);
  const [numOfRandomJobs, setNumOfRandomJobs] = useState(defaults.numOfRandomJobs);
  const [jobs, setJobs] = useState([]);

  const toggleIsRandom = () => setIsRandom(prevIsRandom => !prevIsRandom);

  const onAddJob = () => {
    const newJob = {
      id: jobs.length + 1,
      duration: defaults.duration,
      deadline: defaults.deadline
    };

    setJobs(prevJobs => [...prevJobs, newJob]);
  };

  const onChangeJob = (updatedJob) => {
    setJobs(prevJobs => prevJobs.map((job) => job.id === updatedJob.id ? updatedJob : job));
  };

  const onRemoveJob = (removedJobId) => {
    setJobs(prevJobs => {
      return prevJobs
        .filter((job) => job.id !== removedJobId)
        .map((job, index) => ({ ...job, id: index + 1 }));
    });
  };

  const saveData = () => {
    if (isRandom) {
      onSaveJobData(numOfRandomJobs);
    } else if (jobs.length > 0) {
      onSaveJobData(jobs);
    }
  };

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={isRandom}
            onChange={toggleIsRandom}
          />
        }
        label='Use random data'
      />
      <br />
      {isRandom
        ? (
          <NumOfRandomJobsInput
            numOfRandomJobs={numOfRandomJobs}
            onChange={setNumOfRandomJobs}
          />
        )
        : (
          <InputDataTable
            jobs={jobs}
            onChangeJob={onChangeJob}
            onAddJob={onAddJob}
            onRemoveJob={onRemoveJob}
          />
        )
      }
      <br />
      <Button onClick={saveData}>Save</Button>
    </>
  );
};

DataForm.propTypes = {
  onSaveJobData: PropTypes.func.isRequired
};

export default DataForm;