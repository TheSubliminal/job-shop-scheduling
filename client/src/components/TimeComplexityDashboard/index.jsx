import React from 'react';

import TimeComplexityDataForm from './DataForm';
import StatsDashboardWrapper from '../StatsDashboardWrapper';
import defaults from '../../config/default.json';
import { getFromToStepValidation } from '../../config/validation';

const TimeComplexityDashboard = () => {
  const initialValues = {
    from: defaults.numOfJobsFrom,
    to: defaults.numOfJobsTo,
    step: defaults.numOfJobsStep,
    numOfAnts: defaults.numOfAnts,
  };

  const validationSchema = getFromToStepValidation({
    maxFrom: defaults.maxNumOfJobsFrom,
    maxTo: defaults.maxNumOfJobsTo,
    maxStep: defaults.maxNumOfJobsStep,
  });

  return (
    <StatsDashboardWrapper
      title='Time Complexity'
      description='Correlation between execution time and number of jobs'
      dataForm={<TimeComplexityDataForm />}
      dataFormInitialValues={initialValues}
      dataFormValidationSchema={validationSchema}
      sendValues={() => {}}
    />
  );
};

export default TimeComplexityDashboard;