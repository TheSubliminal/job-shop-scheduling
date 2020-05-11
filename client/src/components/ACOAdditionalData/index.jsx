import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Typography } from '@material-ui/core';

import styles from './styles.module.scss';

const ACOAdditionalData = (props) => {
  const {
    numOfAnts,
    pheromoneSignificanceCoef,
    heuristicSignificanceCoef,
    pheromoneEvaporationCoef,
    onChangeData
  } = props;

  return (
    <>
      <Typography>Fill in additional data</Typography>
      <div className={styles.inputsContainer}>
        <TextField
          value={numOfAnts}
          name='numOfAnts'
          size='small'
          label='Number of ants'
          required
          onChange={onChangeData}
        />
        <TextField
          value={pheromoneSignificanceCoef}
          name='pheromoneSignificanceCoef'
          size='small'
          label='Pheromone Significance Coefficient'
          onChange={onChangeData}
        />
        <TextField
          value={heuristicSignificanceCoef}
          name='heuristicSignificanceCoef'
          size='small'
          label='Heuristic Significance Coefficient'
          onChange={onChangeData}
        />
        <TextField
          value={pheromoneEvaporationCoef}
          name='pheromoneEvaporationCoef'
          size='small'
          label='Pheromone Evaporation Coefficient'
          onChange={onChangeData}
        />
      </div>
    </>
  );
};

ACOAdditionalData.propTypes = {
  numOfAnts: PropTypes.number.isRequired,
  pheromoneSignificanceCoef: PropTypes.number,
  heuristicSignificanceCoef: PropTypes.number,
  pheromoneEvaporationCoef: PropTypes.number,
  onChangeData: PropTypes.func.isRequired
};

export default ACOAdditionalData;