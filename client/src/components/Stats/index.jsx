import React from 'react';
import Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';

import antSearch10Jobs from '../../config/stats/antSearch10Jobs.json';
import antSearch15Jobs from '../../config/stats/antSearch15Jobs.json';
import comparingEfficiency4MaxJobDuration from '../../config/stats/comparingEfficiency4MaxJobDuration.json';
import comparingEfficiency20MaxJobDuration from '../../config/stats/comparingEfficiency20MaxJobDuration.json';
import comparingEfficiency200MaxJobDuration from '../../config/stats/comparingEfficiency200MaxJobDuration.json';

import timeExecution from '../../config/stats/timeExecution.json';

const Stats = () => {
  const getAntSearchSeries = (data) => [{
    data: data.map(({ ant, delay }) => [ant, delay])
  }];

  const getComparingEfficiencySeries = (data) => [
    {
      name: 'Greedy',
      data: data.map(({ jobRun, greedyResult }) => [jobRun, greedyResult])
    },
    {
      name: 'ACO',
      data: data.map(({ jobRun, antColonyResult }) => [jobRun, antColonyResult])
    },
    {
      name: 'Schild-Fredman',
      data: data.map(({ jobRun, schildFredmanResult }) => [jobRun, schildFredmanResult])
    }
  ];

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

  const getComparingEfficiencyOptions = (series, maxTaskDuration) => ({
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        tooltip: {
          headerFormat: '<span style="font-size: 10px">Job run №{point.x}</span><br/>',
          pointFormat: '<span style="color:{point.color}">●</span> {point.y} time units<br/>'
        }
      }
    },
    title: {
      text: `Comparing efficiency on 30 random jobs with ${maxTaskDuration} as max task duration`
    },
    xAxis: {
      title: {
        text: 'Job run'
      }
    },
    yAxis: {
      min: 0,
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

  const comparingEfficiency4Series = getComparingEfficiencySeries(comparingEfficiency4MaxJobDuration);
  const comparingEfficiency4Options = getComparingEfficiencyOptions(comparingEfficiency4Series, 4);

  const comparingEfficiency20Series = getComparingEfficiencySeries(comparingEfficiency20MaxJobDuration);
  const comparingEfficiency20Options = getComparingEfficiencyOptions(comparingEfficiency20Series, 20);

  const comparingEfficiency200Series = getComparingEfficiencySeries(comparingEfficiency200MaxJobDuration);
  const comparingEfficiency200Options = getComparingEfficiencyOptions(comparingEfficiency200Series, 200);


  const timeExecutionSeries = [
    {
      name: 'Greedy',
      data: timeExecution.map(({ numberOfJobs, greedyResult }) => [numberOfJobs, greedyResult])
    },
    {
      name: 'ACO',
      data: timeExecution.map(({ numberOfJobs, antColonyResult }) => [numberOfJobs, antColonyResult])
    },
    {
      name: 'Schild-Fredman',
      data: timeExecution.map(({ numberOfJobs, schildFredmanResult }) => [numberOfJobs, schildFredmanResult])
    }
  ];

  const timeExecutionOptions = {
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
      text: 'Comparing execution time'
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
    series: timeExecutionSeries
  };

  return (
    <>
      <HighchartsReact
        options={antSearch10Options}
        highcharts={highchartsMore(Highcharts)}
      />
      <HighchartsReact
        options={antSearch15Options}
        highcharts={highchartsMore(Highcharts)}
      />
      <HighchartsReact
        options={comparingEfficiency4Options}
        highcharts={highchartsMore(Highcharts)}
      />
      <HighchartsReact
        options={comparingEfficiency20Options}
        highcharts={highchartsMore(Highcharts)}
      />
      <HighchartsReact
        options={comparingEfficiency200Options}
        highcharts={highchartsMore(Highcharts)}
      />
      <HighchartsReact
        options={timeExecutionOptions}
        highcharts={highchartsMore(Highcharts)}
      />
    </>
  );
};

export default Stats;