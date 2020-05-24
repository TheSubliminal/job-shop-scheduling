const { calculateScheduleDelay } = require('../../helpers/delayCalculator.helper');
const { generateRandomJobs } = require('../../helpers/jobFactory.helper');
const { getAlgorithm } = require('../../helpers/getAlgorithm.helper');


const getResults = ({ algorithms, from, to, step, numOfJobsInExperiment, ...params }) => {

  const randomExperimentsInfo = [];
  for (let maxJobDuration = from; maxJobDuration <= to; maxJobDuration += step) {
    randomExperimentsInfo.push({
      maxJobDuration,
      randomExperiment: generateRandomJobs(numOfJobsInExperiment, maxJobDuration)
    });
  }

  const results = algorithms.map((algorithm) => {
    const algorithmExecutionResults = [];
    const algorithmFunc = getAlgorithm(algorithm);
    randomExperimentsInfo.forEach((randomExperimentInfo) => {
      params.jobs = randomExperimentInfo.randomExperiment;
      const schedule =  algorithmFunc(params);
      const totalDelay = calculateScheduleDelay(schedule);
      algorithmExecutionResults.push([randomExperimentInfo.maxJobDuration, totalDelay]);
    });

    return {
      algorithm,
      data: algorithmExecutionResults
    };
  });

  return results;
};

module.exports = {
  getJobDurationResults: getResults
};