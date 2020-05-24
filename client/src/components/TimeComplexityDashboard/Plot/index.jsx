import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { getAlgorithmName } from '../../../helpers/getAlgorithmNameHelper';
import algorithms from '../../../config/algorithms.json';

const algorithmKeys = Object.values(algorithms).map(({ key }) => key);

const TimeComplexityPlot = ({ params }) => {
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
          headerFormat: '<span style="font-size: 10px">{point.x} job(s)</span><br/>',
          pointFormat: '<span style="color:{point.color}">●</span> {point.y}ms<br/>'
        }
      }
    },
    title: {
      text: 'Time complexity comparison'
    },
    xAxis: {
      title: {
        text: 'Number of jobs'
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Execution time'
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

TimeComplexityPlot.propTypes = {
  params: PropTypes.arrayOf(algorithmDataPropType).isRequired
};

export default TimeComplexityPlot;