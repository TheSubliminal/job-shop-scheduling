import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const NumOfAntsPlot = ({ params }) => {

  const options = {
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        }
      }
    },
    title: {
      text: 'Number of ants VS Delay'
    },
    xAxis: {
      title: {
        text: 'Ant Number'
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Delay'
      }
    },
    series: params
  };

  return (
    <HighchartsReact
      options={options}
      highcharts={Highcharts}
    />
  );
};

NumOfAntsPlot.propTypes = {
  params: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default NumOfAntsPlot;