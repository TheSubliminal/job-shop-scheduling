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
        },
        tooltip: {
          headerFormat: '<span style="font-size: 10px">Ant №{point.x}</span><br/>',
          pointFormat: '<span style="color:{point.color}">●</span> Delay: {point.y}<br/>'
        }
      }
    },
    legend: {
      enabled: false
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
    series: [{
      data: params
    }]
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