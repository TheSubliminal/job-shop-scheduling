import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  CircularProgress,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DataForm from '../DataForm';
import AlgorithmChoice from '../AlgorithmChoice';
import ACOAdditionalData from '../ACOAdditionalData';
import ResultIntervalPlot from '../ResultIntervalPlot';
import ResultDataTable from '../ResultDataTable';
import { getAlgorithmResult } from '../../services/algorithmService';
import defaults from '../../config/default.json';
import algorithms from '../../config/algorithms.json';
import { positiveError, requiredError, maxError } from '../../config/errorMessages.json';

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
  greedy: Yup.boolean(),
  schildFredman: Yup.boolean(),
  aco: Yup.boolean(),
  numOfRandomJobs: Yup.number().when('isRandom', {
    is: true,
    then: Yup.number()
      .positive(positiveError)
      .max(defaults.maxNumOfRandomJobs, maxError)
      .integer()
      .required(requiredError)
  }),
  numOfAnts: Yup.number().when('algorithm', {
    is: algorithms.aco.key,
    then: Yup.number()
      .positive(positiveError)
      .max(defaults.maxNumOfAnts, maxError)
      .integer()
      .required(requiredError)
  }),
  pheromoneSignificanceCoef: Yup.number().when('algorithm', {
    is: algorithms.aco.key,
    then: Yup.number()
      .max(defaults.maxPheromoneSignificanceCoef, maxError)
      .positive(positiveError)
  }),
  heuristicSignificanceCoef: Yup.number().when('algorithm', {
    is: algorithms.aco.key,
    then: Yup.number()
      .max(defaults.maxHeuristicSignificanceCoef, maxError)
      .positive(positiveError)
  }),
  pheromoneEvaporationCoef: Yup.number().when('algorithm', {
    is: algorithms.aco.key,
    then: Yup.number()
      .max(defaults.maxPheromoneEvaporationCoef, maxError)
      .positive(positiveError)
  })
});

class AlgorithmDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDataExpanded: true,
      inProgress: false,
      results: null,
      error: null
    };
  }

  toggleDataExpanded = () => this.setState(prevState => ({ isDataExpanded: !prevState.isDataExpanded }));

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
    const {
      isDataExpanded,
      inProgress,
      results
    } = this.state;

    return (
      <>
        {inProgress && (
          <div className={styles.progressOverlay}>
            <CircularProgress />
          </div>
        )}
        <ExpansionPanel expanded={isDataExpanded} onChange={this.toggleDataExpanded}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Algorithm Data</Typography>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails className={styles.algorithmData}>
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
                  <>
                    <DataForm
                      jobs={values.jobs}
                      isRandom={values.isRandom}
                      numOfRandomJobs={values.numOfRandomJobs}
                      setJobs={setFieldValue.bind(null, 'jobs')}
                    />
                    <AlgorithmChoice />
                    {values.aco && <ACOAdditionalData />}
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
          </ExpansionPanelDetails>
        </ExpansionPanel>

        {results && results.map(({ algorithm, schedule, totalDelay }, index) => {
          const algorithmData = algorithms[algorithm];
          const algorithmName = algorithmData && algorithmData.name;

          return (
            <React.Fragment key={index}>
              <ResultIntervalPlot schedule={schedule} algorithm={algorithmName} />
              <ResultDataTable schedule={schedule} totalDelay={totalDelay} algorithm={algorithmName} />
            </React.Fragment>
          );
        })}
      </>
    );
  }
}

export default AlgorithmDashboard;