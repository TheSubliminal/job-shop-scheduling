import React from 'react';

import ExecutionTimeDataForm from './DataForm';
import StatsDashboardWrapper from '../StatsDashboardWrapper';
import defaults from '../../config/default.json';
import { getFromToStepValidation } from '../../config/validation';

const ExecutionTimeDashboard = () => {
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
      title='Execution Time'
      dataForm={<ExecutionTimeDataForm />}
      dataFormInitialValues={initialValues}
      dataFormValidationSchema={validationSchema}
      sendValues={() => {}}
    />
  );
};

export default ExecutionTimeDashboard;