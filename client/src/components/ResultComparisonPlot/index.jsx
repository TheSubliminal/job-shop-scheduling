import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import algorithms from '../../config/algorithms.json';

const algorithmKeys = Object.values(algorithms).map(({ key }) => key);

const ResultComparisonPlot = ({ schedules }) => {
  const series = schedules.map(({ algorithm, schedule }) => {
    const algorithmData = algorithms[algorithm];
    const algorithmName = algorithmData && algorithmData.name;

    return {
      name: algorithmName,
      data: schedule.map(({ delay }, index) => [index, delay])
    };
  });

  const options = {
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        // tooltip: {
        //   headerFormat: '<span style="font-size: 10px">{point.x} job(s)</span><br/>',
        //   pointFormat: '<span style="color:{point.color}">●</span> {point.y}ms<br/>'
        // }
      }
    },
    title: {
      text: 'Comparing job delays'
    },
    xAxis: {
      title: {
        text: 'Job index'
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

const jobPropType = PropTypes.exact({
  id: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  deadline: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  delay: PropTypes.number.isRequired,
  algorithm: PropTypes.oneOf(algorithmKeys).isRequired
});

const schedulePropType = PropTypes.shape({
  schedule: PropTypes.arrayOf(jobPropType),
  algorithm: PropTypes.oneOf(algorithmKeys).isRequired
});

ResultComparisonPlot.propTypes = {
  schedules: PropTypes.arrayOf(schedulePropType).isRequired
};

export default ResultComparisonPlot;