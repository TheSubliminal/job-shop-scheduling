import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';

const ResultIntervalPlot = ({ schedule }) => {
  const jobIDs = schedule.map(job => job.id);

  const series = [
    {
      name: 'Schedule',
      data: schedule.map(({ duration, endTime }) => [endTime - duration, endTime])
    }
  ];

  const options = {
    chart: {
      type: 'columnrange',
      inverted: true
    },
    title: {
      text: 'Schedule'
    },
    plotOptions: {
      series: {
        type: 'columnrange',
        tooltip: {
          headerFormat: '<span style="font-size: 10px">ID {point.key}</span><br/>',
          pointFormat: '<span style="color:{point.color}">●</span> Start {point.low}; Finish {point.high}<br/>'
        }
      }
    },
    xAxis: {
      categories: jobIDs
    },
    yAxis: {
      min: 0,
      allowDecimals: false
    },
    series
  };

  return (
    <HighchartsReact
      options={options}
      highcharts={highchartsMore(Highcharts)}
    />
  );
};

const jobPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired
});

ResultIntervalPlot.propTypes = {
  schedule: PropTypes.arrayOf(jobPropType).isRequired
};

export default ResultIntervalPlot;