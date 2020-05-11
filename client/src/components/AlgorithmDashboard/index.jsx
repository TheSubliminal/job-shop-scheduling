import React from 'react';
import { Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DataForm from '../DataForm';
import AlgorithmChoice from '../AlgorithmChoice';
import ACOAdditionalData from '../ACOAdditionalData';
import defaults from '../../config/default.json';
import algorithms from '../../config/algorithms.json';

import styles from './styles.module.scss';

class AlgorithmDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: [],
      isRandom: false,
      numOfRandomJobs: defaults.numOfRandomJobs,
      algorithm: defaults.algorithm,
      numOfAnts: defaults.numOfAnts,
      pheromoneSignificanceCoef: defaults.pheromoneSignificanceCoef,
      heuristicSignificanceCoef: defaults.heuristicSignificanceCoef,
      pheromoneEvaporationCoef: defaults.pheromoneEvaporationCoef,
      isDataExpanded: true
    };
  }

  toggleIsRandom = () => this.setState(prevState => ({ isRandom: !prevState.isRandom }));

  toggleDataExpanded = () => this.setState(prevState => ({ isDataExpanded: !prevState.isDataExpanded }));

  setJobs = (jobs) => this.setState({ jobs });

  setAlgorithm = (algorithm) => this.setState({ algorithm });

  setNumOfRandomJobs = (numOfRandomJobs) => this.setState({ numOfRandomJobs });

  onChangeACOAdditionalData = (event) => {
    const { name, value } = event.target;
    const parsedValue = parseFloat(value);

    if (isNaN(parsedValue) || parsedValue < 0) {
      return;
    }

    this.setState({ [name]: parsedValue });
  }

  onSubmit = () => {
    const {
      algorithm,
      jobs,
      isRandom,
      numOfRandomJobs,
      numOfAnts,
      pheromoneSignificanceCoef,
      heuristicSignificanceCoef,
      pheromoneEvaporationCoef
    } = this.state;

    const algorithmInfo = { algorithm };

    if (isRandom) {
      algorithmInfo.numOfRandomJobs = numOfRandomJobs;
    } else {
      algorithmInfo.jobs = jobs;
    }

    if (algorithm === algorithms.aco.key) {
      algorithmInfo.numOfAnts = numOfAnts;
      algorithmInfo.pheromoneSignificanceCoef = pheromoneSignificanceCoef;
      algorithmInfo.heuristicSignificanceCoef = heuristicSignificanceCoef;
      algorithmInfo.pheromoneEvaporationCoef = pheromoneEvaporationCoef;
    }

    console.log(algorithmInfo);
  };

  render() {
    const {
      jobs,
      isRandom,
      numOfRandomJobs,
      algorithm,
      numOfAnts,
      pheromoneSignificanceCoef,
      heuristicSignificanceCoef,
      pheromoneEvaporationCoef,
      isDataExpanded
    } = this.state;

    const canSubmit = isRandom ? numOfRandomJobs > 0 : jobs.length > 0;

    return (
      <>
        <ExpansionPanel expanded={isDataExpanded} onChange={this.toggleDataExpanded}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Algorithm Data</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={styles.algorithmData}>
            <DataForm
              jobs={jobs}
              isRandom={isRandom}
              numOfRandomJobs={numOfRandomJobs}
              onSaveJobs={this.setJobs}
              onToggleRandom={this.toggleIsRandom}
              onSaveNumOfRandomJobs={this.setNumOfRandomJobs}
            />
            <AlgorithmChoice selectedAlgorithm={algorithm} onSelectAlgorithm={this.setAlgorithm} />
            {algorithm === algorithms.aco.key && (
              <ACOAdditionalData
                numOfAnts={numOfAnts}
                pheromoneSignificanceCoef={pheromoneSignificanceCoef}
                heuristicSignificanceCoef={heuristicSignificanceCoef}
                pheromoneEvaporationCoef={pheromoneEvaporationCoef}
                onChangeData={this.onChangeACOAdditionalData}
              />
            )}
            <div>
              <Button
                disabled={!canSubmit}
                onClick={this.onSubmit}
              >
                Submit
              </Button>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </>
    );
  }
}

export default AlgorithmDashboard;