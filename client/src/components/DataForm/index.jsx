import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, Typography } from '@material-ui/core';

import InputDataTable from '../JobDataTable';
import NumOfRandomJobsInput from '../NumOfRandomJobsInput';

const defaultNumOfRandomJobs = 5;

const DataForm = () => {
  const [isRandom, setIsRandom] = useState(false);
  const [numOfRandomJobs, setNumOfRandomJobs] = useState(defaultNumOfRandomJobs);
  const [jobs, setJobs] = useState([]);

  const toggleIsRandom = () => setIsRandom(prevIsRandom => !prevIsRandom);

  const onAddJob = () => {
    const newJob = {
      id: jobs.length + 1,
      duration: 0,
      deadline: 0
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

  const submitData = () => null;

  return (
    <>
      <Typography variant='h4'>
        Fill algorithm data
      </Typography>
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
      <Button onClick={submitData}>Submit</Button>
    </>
  );
};

export default DataForm;