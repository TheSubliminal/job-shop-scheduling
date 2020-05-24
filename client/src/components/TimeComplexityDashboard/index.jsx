import React from 'react';

import TimeComplexityDataForm from './DataForm';
import StatsDashboardWrapper from '../StatsDashboardWrapper';
import TimeComplexityPlot from './Plot';
import { getTimeComplexityStats } from '../../services/statsService';
import defaults from '../../config/default.json';
import { getFromToStepValidation } from '../../config/validation';

const TimeComplexityDashboard = () => {
  const initialValues = {
    from: defaults.numOfJobsFrom,
    to: defaults.numOfJobsTo,
    step: defaults.numOfJobsStep,
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
      plot={TimeComplexityPlot}
      onSubmit={getTimeComplexityStats}
    />
  );
};

export default TimeComplexityDashboard;