import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { getAlgorithmName } from '../../../helpers/getAlgorithmNameHelper';
import algorithms from '../../../config/algorithms.json';

const algorithmKeys = Object.values(algorithms).map(({ key }) => key);

const NumOfJobsPlot = ({ params }) => {
  const series = params.map(({ algorithm, data }) => ({
    name: getAlgorithmName(algorithm),
    data
  }));

  const options = {
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        tooltip: {
          headerFormat: '<span style="font-size: 10px">{point.x} job(s)</span><br/>'
        }
      }
    },
    title: {
      text: 'Number of jobs VS Delay'
    },
    xAxis: {
      title: {
        text: 'Number of jobs'
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

NumOfJobsPlot.propTypes = {
  params: PropTypes.arrayOf(algorithmDataPropType).isRequired
};

export default NumOfJobsPlot;