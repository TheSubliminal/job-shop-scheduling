import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

import DataFormExpansionPanel from '../DataFormExpansionPanel';
import AlgorithmChoice from '../AlgorithmChoice';
import ExecutionTimeDataForm from './DataForm';
import defaults from '../../config/default.json';
import algorithms from '../../config/algorithms.json';
import { maxError, positiveError, requiredError } from '../../config/errorMessages.json';
import { algorithmChoiceValidationSchema } from '../../config/validation';

const validationSchema = Yup.object({
  from: Yup.number()
    .positive(positiveError)
    .max(defaults.maxNumOfJobsFrom, maxError)
    .integer()
    .required(requiredError),
  to: Yup.number()
    .positive(positiveError)
    .max(defaults.maxNumOfJobsTo, maxError)
    .integer()
    .required(requiredError),
  step: Yup.number()
    .positive(positiveError)
    .max(defaults.maxNumOfJobsStep, maxError)
    .integer()
    .required(requiredError),
  ...algorithmChoiceValidationSchema
});

const ExecutionTimeDashboard = () => {
  const [inProgress, setInProgress] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = (values) => {
    const {
      aco,
      numOfAnts,
      pheromoneSignificanceCoef,
      heuristicSignificanceCoef,
      pheromoneEvaporationCoef
    } = values;

    const selectedAlgorithms = Object.values(algorithms)
      .filter(({ key }) => values[key])
      .map(({ key }) => key);

    const algorithmInfo = { algorithms: selectedAlgorithms };

    if (aco) {
      algorithmInfo.numOfAnts = numOfAnts;
      algorithmInfo.pheromoneSignificanceCoef = pheromoneSignificanceCoef;
      algorithmInfo.heuristicSignificanceCoef = heuristicSignificanceCoef;
      algorithmInfo.pheromoneEvaporationCoef = pheromoneEvaporationCoef;
    }

    // setInProgress(true);
    // getAlgorithmResult(algorithmInfo)
    //   .then((results) => setResults(results))
    //   .catch((error) => {
    //     setError(error);
    //     setResults(null);
    //   })
    //   .finally(() => setInProgress(false));
  };

  return (
    <DataFormExpansionPanel title='Execution Time' isLoading={inProgress}>
      <Formik
        initialValues={{
          [algorithms.greedy.key]: true,
          [algorithms.schildFredman.key]: false,
          [algorithms.aco.key]: false,
          from: defaults.numOfJobsFrom,
          to: defaults.numOfJobsTo,
          step: defaults.numOfJobsStep,
          numOfAnts: defaults.numOfAnts,
          pheromoneSignificanceCoef: defaults.pheromoneSignificanceCoef,
          heuristicSignificanceCoef: defaults.heuristicSignificanceCoef,
          pheromoneEvaporationCoef: defaults.pheromoneEvaporationCoef
        }}
        validationSchema={validationSchema}
        validateOnChange
        onSubmit={onSubmit}
      >
        {({ values, errors, handleSubmit }) => {
          const errorsExist = !!Object.keys(errors).length;
          const areAlgorithmsSelected = values.greedy || values.schildFredman || values.aco;

          return (
            <>
              <ExecutionTimeDataForm />
              <AlgorithmChoice isACO={values.aco} />
              <div>
                <Button
                  disabled={errorsExist || !areAlgorithmsSelected}
                  onClick={handleSubmit}
                  color='primary'
                  variant='contained'
                >
                  Submit
                </Button>
              </div>
            </>
          );
        }}
      </Formik>
    </DataFormExpansionPanel>
  );
};

export default ExecutionTimeDashboard;