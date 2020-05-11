import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Checkbox, FormControlLabel, Typography } from '@material-ui/core';

import InputDataTable from '../InputDataTable';
import NumOfRandomJobsInput from '../NumOfRandomJobsInput';

const DataForm = ({ jobs, isRandom }) => (
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
    </div>
    {isRandom
      ? <NumOfRandomJobsInput />
      : <InputDataTable jobs={jobs} />
    }
  </>
);

const jobPropType = PropTypes.exact({
  duration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  deadline: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
});

DataForm.propTypes = {
  jobs: PropTypes.arrayOf(jobPropType).isRequired,
  isRandom: PropTypes.bool.isRequired
};

export default DataForm;