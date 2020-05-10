import React, { useState } from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DataForm from '../DataForm';
import AlgorithmChoice from '../AlgorithmChoice';

import styles from './styles.module.scss';

const AlgorithmDashboard = () => {
  const [jobsData, setJobData] = useState(null);
  const [algorithm, setAlgorithm] = useState(null);
  const [isDataExpanded, setIsDataExpanded] = useState(true);
  const [areAlgorithmsExpanded, setAreAlgorithmsExpanded] = useState(false);

  const toggleDataExpanded = () => setIsDataExpanded(prevExpanded => !prevExpanded);
  const toggleAlgorithmsExpanded = () => setAreAlgorithmsExpanded(prevExpanded => !prevExpanded);

  return (
    <>
      <ExpansionPanel expanded={isDataExpanded} onChange={toggleDataExpanded}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Algorithm Data</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={styles.algorithmData}>
          <DataForm onSaveJobData={setJobData} />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel expanded={areAlgorithmsExpanded} onChange={toggleAlgorithmsExpanded}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Choose Algorithm</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <AlgorithmChoice selectedAlgorithm={algorithm} onSelectAlgorithm={setAlgorithm} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
};

export default AlgorithmDashboard;