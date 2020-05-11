import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, Typography } from '@material-ui/core';

import InputDataTable from '../JobDataTable';
import NumOfRandomJobsInput from '../NumOfRandomJobsInput';
import defaults from '../../config/default.json';

const DataForm = (props) => {
  const {
    jobs,
    isRandom,
    numOfRandomJobs,
    onSaveJobs,
    onToggleRandom,
    onSaveNumOfRandomJobs
  } = props;

  const onAddJob = () => {
    const newJob = {
      id: jobs.length + 1,
      duration: defaults.duration,
      deadline: defaults.deadline
    };

    onSaveJobs([...jobs, newJob]);
  };

  const onChangeJob = (updatedJob) => {
    onSaveJobs(jobs.map((job) => job.id === updatedJob.id ? updatedJob : job));
  };

  const onRemoveJob = (removedJobId) => {
    onSaveJobs(jobs
      .filter((job) => job.id !== removedJobId)
      .map((job, index) => ({ ...job, id: index + 1 }))
    );
  };

  return (
    <>
      <Typography>Fill input data</Typography>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={isRandom}
              onChange={onToggleRandom}
            />
          }
          label='Use random data'
        />
        <br />
        {isRandom
          ? (
            <NumOfRandomJobsInput
              numOfRandomJobs={numOfRandomJobs}
              onChange={onSaveNumOfRandomJobs}
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
      </div>
    </>
  );
};

const jobPropType = PropTypes.exact({
  id: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  deadline: PropTypes.number.isRequired
});

DataForm.propTypes = {
  jobs: PropTypes.arrayOf(jobPropType).isRequired,
  isRandom: PropTypes.bool.isRequired,
  numOfRandomJobs: PropTypes.number.isRequired,
  onSaveJobs: PropTypes.func.isRequired,
  onToggleRandom: PropTypes.func.isRequired,
  onSaveNumOfRandomJobs: PropTypes.func.isRequired
};

export default DataForm;