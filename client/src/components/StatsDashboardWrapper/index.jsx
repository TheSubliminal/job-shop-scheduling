import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';

import DataFormExpansionPanel from '../DataFormExpansionPanel';
import AlgorithmChoice from '../AlgorithmChoice';
import defaults from '../../config/default.json';
import algorithms from '../../config/algorithms.json';
import { algorithmChoiceValidationSchema } from '../../config/validation';

const StatsDashboardWrapper = (props) => {
  const {
    title,
    description,
    dataForm,
    dataFormInitialValues,
    dataFormValidationSchema,
    plot: Plot,
    onSubmit: handleSubmit
  } = props;

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

    setInProgress(true);
    handleSubmit(algorithmInfo)
      .then((results) => setResults({ params: results }))
      .catch((error) => {
        setError(error);
        setResults(null);
      })
      .finally(() => setInProgress(false));
  };

  return (
    <DataFormExpansionPanel
      title={title}
      description={description}
      isLoading={inProgress}
    >
      <Formik
        initialValues={{
          ...dataFormInitialValues,
          [algorithms.greedy.key]: true,
          [algorithms.schildFredman.key]: false,
          [algorithms.aco.key]: false,
          numOfAnts: defaults.numOfAnts,
          pheromoneSignificanceCoef: defaults.pheromoneSignificanceCoef,
          heuristicSignificanceCoef: defaults.heuristicSignificanceCoef,
          pheromoneEvaporationCoef: defaults.pheromoneEvaporationCoef
        }}
        validationSchema={Yup.object({
          ...dataFormValidationSchema,
          ...algorithmChoiceValidationSchema
        })}
        validateOnChange
        onSubmit={onSubmit}
      >
        {({ values, errors, handleSubmit }) => {
          const errorsExist = !!Object.keys(errors).length;
          const areAlgorithmsSelected = values.greedy || values.schildFredman || values.aco;

          return (
            <>
              {dataForm}
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
      <Plot {...results} />
    </DataFormExpansionPanel>
  );
};

StatsDashboardWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  dataForm: PropTypes.element.isRequired,
  dataFormInitialValues: PropTypes.object.isRequired,
  dataFormValidationSchema: PropTypes.objectOf(PropTypes.object).isRequired,
  plot: PropTypes.elementType.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default StatsDashboardWrapper;