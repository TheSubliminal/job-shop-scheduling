import React from 'react';
import * as Yup from 'yup';

import JobDurationDataForm from './DataForm';
import StatsDashboardWrapper from '../StatsDashboardWrapper';
import defaults from '../../config/default.json';
import { maxError, positiveError, requiredError } from '../../config/errorMessages.json';
import { getFromToStepValidation } from '../../config/validation';

const JobDurationDashboard = () => {
  const initialValues = {
    from: defaults.jobDurationFrom,
    to: defaults.jobDurationTo,
    step: defaults.jobDurationStep,
    numOfJobsInExperiment: defaults.numOfJobsInExperiment,
  };

  const validationSchema = {
    ...getFromToStepValidation({
      maxFrom: defaults.maxJobDurationFrom,
      maxTo: defaults.maxJobDurationTo,
      maxStep: defaults.maxJobDurationStep,
    }),
    numOfJobsInExperiment: Yup.number()
      .positive(positiveError)
      .max(defaults.maxNumOfJobsInExperiment, maxError)
      .required(requiredError)
  };

  return (
    <StatsDashboardWrapper
      title='Job Duration VS Delay'
      description='Correlation between delay and maximum job duration'
      dataForm={<JobDurationDataForm />}
      dataFormInitialValues={initialValues}
      dataFormValidationSchema={validationSchema}
      sendValues={() => {}}
    />
  );
};

export default JobDurationDashboard;