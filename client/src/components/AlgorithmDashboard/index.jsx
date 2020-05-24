import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';

import DataForm from './DataForm';
import AlgorithmChoice from '../AlgorithmChoice';
import ResultIntervalPlot from './ResultIntervalPlot';
import ResultDataTable from './ResultDataTable';
import ResultComparisonPlot from './ResultComparisonPlot';
import DataFormExpansionPanel from '../DataFormExpansionPanel';
import algorithms from '../../config/algorithms.json';
import { getAlgorithmResult } from '../../services/algorithmService';
import defaults from '../../config/default.json';
import { positiveError, requiredError, maxError } from '../../config/errorMessages.json';
import { algorithmChoiceValidationSchema } from '../../config/validation';

import styles from './styles.module.scss';

const jobSchema = Yup.object().shape({
  duration: Yup.number()
    .positive(positiveError)
    .max(defaults.maxDuration, maxError)
    .integer()
    .required(requiredError),
  deadline: Yup.number()
    .positive(positiveError)
    .integer()
    .required(requiredError)
});

const inputDataSchema = Yup.object().shape({
  jobs: Yup.array().when('isRandom', {
    is: false,
    then: Yup.array().of(jobSchema).min(1).required(requiredError)
  }),
  isRandom: Yup.boolean(),
  numOfRandomJobs: Yup.number().when('isRandom', {
    is: true,
    then: Yup.number()
      .positive(positiveError)
      .max(defaults.maxNumOfRandomJobs, maxError)
      .integer()
      .required(requiredError)
  }),
  ...algorithmChoiceValidationSchema
});

class AlgorithmDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inProgress: false,
      results: null,
      error: null
    };
  }

  onSubmit = (values) => {
    const {
      aco,
      jobs,
      isRandom,
      numOfRandomJobs,
      numOfAnts,
      pheromoneSignificanceCoef,
      heuristicSignificanceCoef,
      pheromoneEvaporationCoef
    } = values;

    const selectedAlgorithms = Object.values(algorithms)
      .filter(({ key }) => values[key])
      .map(({ key }) => key);

    const algorithmInfo = { algorithms: selectedAlgorithms };

    if (isRandom) {
      algorithmInfo.numOfRandomJobs = numOfRandomJobs;
    } else {
      algorithmInfo.jobs = jobs.map((job, index) => ({ ...job, id: index + 1 }));
    }

    if (aco) {
      algorithmInfo.numOfAnts = numOfAnts;
      algorithmInfo.pheromoneSignificanceCoef = pheromoneSignificanceCoef;
      algorithmInfo.heuristicSignificanceCoef = heuristicSignificanceCoef;
      algorithmInfo.pheromoneEvaporationCoef = pheromoneEvaporationCoef;
    }

    this.setState({ inProgress: true }, () => {
      getAlgorithmResult(algorithmInfo)
        .then((results) => this.setState({ results }))
        .catch((error) => this.setState({ error, results: null }))
        .finally(() => this.setState({ inProgress: false }));
    });
  };

  render() {
    const { inProgress, results } = this.state;

    return (
      <>
        <DataFormExpansionPanel
          title='Algorithm Data'
          isLoading={inProgress}
        >
          <Formik
            initialValues={{
              jobs: [{ duration: defaults.duration, deadline: defaults.deadline }],
              [algorithms.greedy.key]: true,
              [algorithms.schildFredman.key]: false,
              [algorithms.aco.key]: false,
              isRandom: false,
              numOfRandomJobs: defaults.numOfRandomJobs,
              numOfAnts: defaults.numOfAnts,
              pheromoneSignificanceCoef: defaults.pheromoneSignificanceCoef,
              heuristicSignificanceCoef: defaults.heuristicSignificanceCoef,
              pheromoneEvaporationCoef: defaults.pheromoneEvaporationCoef
            }}
            validationSchema={inputDataSchema}
            validateOnChange
            onSubmit={this.onSubmit}
          >
            {({ values, errors, handleSubmit, setFieldValue }) => {
              const errorsExist = !!Object.keys(errors).length;
              const areAlgorithmsSelected = values.greedy || values.schildFredman || values.aco;

              return (
                <div className={styles.dataForm}>
                  <DataForm
                    jobs={values.jobs}
                    isRandom={values.isRandom}
                    numOfRandomJobs={values.numOfRandomJobs}
                    setJobs={setFieldValue.bind(null, 'jobs')}
                  />
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
                </div>
              );
            }}
          </Formik>
        </DataFormExpansionPanel>

        {results && (
          <>
            <ResultComparisonPlot schedules={results} />
            {results.map(({ algorithm, schedule, totalDelay }) => {
              const algorithmData = algorithms[algorithm];
              const algorithmName = algorithmData && algorithmData.name;

              return (
                <React.Fragment key={algorithm}>
                  <ResultIntervalPlot schedule={schedule} algorithm={algorithmName} />
                  <ResultDataTable schedule={schedule} totalDelay={totalDelay} algorithm={algorithmName} />
                </React.Fragment>
              );
            })}
          </>
        )}
      </>
    );
  }
}

export default AlgorithmDashboard;