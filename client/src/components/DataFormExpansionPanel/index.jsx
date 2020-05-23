import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  CircularProgress,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import styles from './styles.module.scss';

const DataFormExpansionPanel = ({ title, isLoading, children }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => setIsExpanded(prevIsExpanded => !prevIsExpanded);

  return (
    <ExpansionPanel expanded={isExpanded} onChange={toggleExpanded}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={styles.algorithmData}>
        {children}
        {isLoading && (
          <div className={styles.progressOverlay}>
            <CircularProgress />
          </div>
        )}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

DataFormExpansionPanel.propTypes = {
  title: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default DataFormExpansionPanel;