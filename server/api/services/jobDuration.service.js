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
    const algorithmFunc = getAlgorithm(algorithm);
    const algorithmExecutionResults = randomExperimentsInfo.map((randomExperimentInfo) => {
      params.jobs = randomExperimentInfo.randomExperiment;
      const schedule =  algorithmFunc(params);
      const totalDelay = calculateScheduleDelay(schedule);
      return [randomExperimentInfo.maxJobDuration, totalDelay];
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