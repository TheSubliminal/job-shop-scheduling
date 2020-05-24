import React from 'react';

import NumOfJobsDataForm from './DataForm';
import StatsDashboardWrapper from '../StatsDashboardWrapper';
import defaults from '../../config/default.json';
import { getFromToStepValidation } from '../../config/validation';

const NumOfJobsDashboard = () => {
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
      title='Number Of Jobs VS Delay'
      description='Correlation between delay and number of jobs in problem'
      dataForm={<NumOfJobsDataForm />}
      dataFormInitialValues={initialValues}
      dataFormValidationSchema={validationSchema}
      sendValues={() => {}}
    />
  );
};

export default NumOfJobsDashboard;