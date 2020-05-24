import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import TimeComplexityDashboard from '../TimeComplexityDashboard';
import JobDurationDashboard from '../JobDurationDashboard';
import NumOfJobsDashboard from '../NumOfJobsDashboard';
import antSearch10Jobs from '../../config/stats/antSearch10Jobs.json';
import antSearch15Jobs from '../../config/stats/antSearch15Jobs.json';

const Stats = () => {
  const getAntSearchSeries = (data) => [{
    data: data.map(({ ant, delay }) => [ant, delay])
  }];

  const getAntSearchOptions = (series, numberOfJobs) => ({
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: false
      }
    },
    legend: {
      enabled: false
    },
    title: {
      text: `ACO on ${numberOfJobs} jobs`
    },
    xAxis: {
      title: {
        text: 'Number of ants'
      }
    },
    yAxis: {
      title: {
        text: 'Delay'
      }
    },
    series
  });

  const antSearch10Series = getAntSearchSeries(antSearch10Jobs);
  const antSearch10Options = getAntSearchOptions(antSearch10Series, 10);

  const antSearch15Series = getAntSearchSeries(antSearch15Jobs);
  const antSearch15Options = getAntSearchOptions(antSearch15Series, 15);

  return (
    <>
      <TimeComplexityDashboard />
      <JobDurationDashboard />
      <NumOfJobsDashboard />
      <HighchartsReact
        options={antSearch10Options}
        highcharts={Highcharts}
      />
      <HighchartsReact
        options={antSearch15Options}
        highcharts={Highcharts}
      />
    </>
  );
};

export default Stats;