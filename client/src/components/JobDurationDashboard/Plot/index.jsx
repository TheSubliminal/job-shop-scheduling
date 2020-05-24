import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { getAlgorithmName } from '../../../helpers/getAlgorithmNameHelper';
import algorithms from '../../../config/algorithms.json';

const algorithmKeys = Object.values(algorithms).map(({ key }) => key);

const JobDurationPlot = ({ params }) => {
  const series = params.map(({ algorithm, data }) => ({
    name: getAlgorithmName(algorithm),
    data
  }));

  const options = {
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        }
      }
    },
    title: {
      text: 'Job duration VS Delay'
    },
    xAxis: {
      title: {
        text: 'Max job duration'
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Delay'
      }
    },
    series
  };

  return (
    <HighchartsReact
      options={options}
      highcharts={Highcharts}
    />
  );
};

const algorithmDataPropType = PropTypes.exact({
  algorithm: PropTypes.oneOf(algorithmKeys).isRequired,
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
});

JobDurationPlot.propTypes = {
  params: PropTypes.arrayOf(algorithmDataPropType).isRequired
};

export default JobDurationPlot;