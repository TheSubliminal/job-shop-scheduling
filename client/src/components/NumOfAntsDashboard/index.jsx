import React from 'react';
import * as Yup from 'yup';

import NumOfAntsDataForm from './DataForm';
import StatsDashboardWrapper from '../StatsDashboardWrapper';
import NumOfAntsPlot from './Plot';
import { getNumOfAntsStats } from '../../services/statsService';
import defaults from '../../config/default.json';
import { maxError, positiveError, requiredError } from '../../config/errorMessages.json';

const NumOfAntsDashboard = () => {
  const initialValues = {
    numOfRandomJobs: defaults.numOfJobsInExperiment,
    maxJobDuration: defaults.maxJobDuration,
  };

  const validationSchema = {
    maxJobDuration: Yup.number()
      .positive(positiveError)
      .max(defaults.maxMaxJobDuration, maxError)
      .required(requiredError),
    numOfRandomJobs: Yup.number()
      .positive(positiveError)
      .max(defaults.maxNumOfRandomJobs, maxError)
      .required(requiredError)
  };

  return (
    <StatsDashboardWrapper
      isACO
      title='Number Of Ants VS Delay'
      description='Correlation between delay and number of ants using ACO algorithm'
      dataForm={<NumOfAntsDataForm />}
      dataFormInitialValues={initialValues}
      dataFormValidationSchema={validationSchema}
      plot={NumOfAntsPlot}
      onSubmit={getNumOfAntsStats}
    />
  );
};

export default NumOfAntsDashboard;