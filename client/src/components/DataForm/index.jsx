import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, Typography } from '@material-ui/core';

import InputDataTable from './InputDataTable';
import NumOfRandomJobsInput from './NumOfRandomJobsInput';

const defaultNumOfRandomJobs = 5;

const DataForm = () => {
  const [isRandom, setIsRandom] = useState(false);
  const [numOfRandomJobs, setNumOfRandomJobs] = useState(defaultNumOfRandomJobs);

  const toggleIsRandom = () => setIsRandom(prevIsRandom => !prevIsRandom);

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
        : <InputDataTable />
      }
      <br />
      <Button onClick={submitData}>Submit</Button>
    </>
  );
};

export default DataForm;