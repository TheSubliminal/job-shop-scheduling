import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import algorithms from '../../config/algorithms.json';

const algorithmKeys = Object.values(algorithms).map(({ key }) => key);

const ResultComparisonPlot = ({ schedules }) => {
  const jobDelaySeries = schedules.map(({ algorithm, schedule }) => {
    const algorithmData = algorithms[algorithm];
    const algorithmName = algorithmData && algorithmData.name;

    return {
      name: algorithmName,
      data: schedule.map(({ delay }, index) => [index, delay])
    };
  });

  const totalDelaySeries = schedules.map(({ algorithm, totalDelay }) => {
    const algorithmData = algorithms[algorithm];
    const algorithmName = algorithmData && algorithmData.name;

    return {
      name: algorithmName,
      data: [{
        name: algorithmName,
        y: totalDelay
      }]
    };
  });

  const jobDelayOptions = {
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        }
      }
    },
    title: {
      text: 'Comparing job delays'
    },
    xAxis: {
      title: {
        text: 'Job index'
      },
      allowDecimals: false
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Delay'
      }
    },
    series: jobDelaySeries
  };

  const totalDelayOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Total delays'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total delay'
      }
    },
    series: totalDelaySeries
  };

  return (
    <>
      <HighchartsReact
        options={totalDelayOptions}
        highcharts={Highcharts}
      />
      <HighchartsReact
        options={jobDelayOptions}
        highcharts={Highcharts}
      />
    </>
  );
};

const jobPropType = PropTypes.exact({
  id: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  deadline: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  delay: PropTypes.number.isRequired
});

const schedulePropType = PropTypes.exact({
  schedule: PropTypes.arrayOf(jobPropType).isRequired,
  totalDelay: PropTypes.number.isRequired,
  algorithm: PropTypes.oneOf(algorithmKeys).isRequired
});

ResultComparisonPlot.propTypes = {
  schedules: PropTypes.arrayOf(schedulePropType).isRequired
};

export default ResultComparisonPlot;