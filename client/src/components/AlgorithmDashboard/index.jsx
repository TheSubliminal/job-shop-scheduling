import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DataForm from '../DataForm';
import AlgorithmChoice from '../AlgorithmChoice';
import ACOAdditionalData from '../ACOAdditionalData';
import defaults from '../../config/default.json';
import algorithms from '../../config/algorithms.json';
import { positiveError, requiredError } from '../../config/errorMessages.json';

import styles from './styles.module.scss';

const algorithmKeys = Object.values(algorithms).map(({ key }) => key);

const jobSchema = Yup.object().shape({
  duration: Yup.number().positive(positiveError).integer().required(requiredError),
  deadline: Yup.number().positive(positiveError).integer().required(requiredError)
});

const inputDataSchema = Yup.object().shape({
  jobs: Yup.array().when('isRandom', {
    is: false,
    then: Yup.array().of(jobSchema).min(1).required(requiredError)
  }),
  isRandom: Yup.boolean(),
  numOfRandomJobs: Yup.number().when('isRandom', {
    is: true,
    then: Yup.number().positive(positiveError).integer().required(requiredError)
  }),
  algorithm: Yup.mixed().oneOf(algorithmKeys).required(),
  numOfAnts: Yup.number().when('algorithm', {
    is: algorithms.aco.key,
    then: Yup.number().positive(positiveError).integer().required(requiredError)
  }),
  pheromoneSignificanceCoef: Yup.number().positive(positiveError),
  heuristicSignificanceCoef: Yup.number().positive(positiveError),
  pheromoneEvaporationCoef: Yup.number().positive(positiveError)
});

class AlgorithmDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDataExpanded: true
    };
  }

  toggleDataExpanded = () => this.setState(prevState => ({ isDataExpanded: !prevState.isDataExpanded }));

  onSubmit = (values) => {
    const {
      algorithm,
      jobs,
      isRandom,
      numOfRandomJobs,
      numOfAnts,
      pheromoneSignificanceCoef,
      heuristicSignificanceCoef,
      pheromoneEvaporationCoef
    } = values;

    const algorithmInfo = { algorithm };

    if (isRandom) {
      algorithmInfo.numOfRandomJobs = numOfRandomJobs;
    } else {
      algorithmInfo.jobs = jobs.map((job, index) => ({ ...job, id: index + 1 }));
    }

    if (algorithm === algorithms.aco.key) {
      algorithmInfo.numOfAnts = numOfAnts;
      algorithmInfo.pheromoneSignificanceCoef = pheromoneSignificanceCoef;
      algorithmInfo.heuristicSignificanceCoef = heuristicSignificanceCoef;
      algorithmInfo.pheromoneEvaporationCoef = pheromoneEvaporationCoef;
    }

    // send request to server
  };

  render() {
    const {
      isDataExpanded
    } = this.state;

    return (
      <>
        <ExpansionPanel expanded={isDataExpanded} onChange={this.toggleDataExpanded}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Algorithm Data</Typography>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails className={styles.algorithmData}>
            <Formik
              initialValues={{
                jobs: [{ duration: defaults.duration, deadline: defaults.deadline }],
                isRandom: false,
                numOfRandomJobs: defaults.numOfRandomJobs,
                algorithm: defaults.algorithm,
                numOfAnts: defaults.numOfAnts,
                pheromoneSignificanceCoef: defaults.pheromoneSignificanceCoef,
                heuristicSignificanceCoef: defaults.heuristicSignificanceCoef,
                pheromoneEvaporationCoef: defaults.pheromoneEvaporationCoef
              }}
              validationSchema={inputDataSchema}
              validateOnBlur
              onSubmit={this.onSubmit}
            >
              {({ values, errors, handleSubmit }) => (
                <>
                  <DataForm
                    jobs={values.jobs}
                    isRandom={values.isRandom}
                    numOfRandomJobs={values.numOfRandomJobs}
                  />
                  <AlgorithmChoice />
                  {values.algorithm === algorithms.aco.key && <ACOAdditionalData />}
                  <div>
                    <Button
                      disabled={!!Object.keys(errors).length}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                </>
              )}
            </Formik>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </>
    );
  }
}

export default AlgorithmDashboard;