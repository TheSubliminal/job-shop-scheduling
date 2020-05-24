const { calculateScheduleDelay } = require('../../helpers/delayCalculator.helper');
const { generateRandomJobs } = require('../../helpers/jobFactory.helper');
const { getAlgorithm } = require('../../helpers/getAlgorithm.helper');


const getResults = ({ algorithms, from, to, step, ...params }) => {

  const randomExperimentsInfo = [];
  for (let numOfJobs = from; numOfJobs <= to; numOfJobs += step) {
    randomExperimentsInfo.push({
      numOfJobs,
      randomExperiment: generateRandomJobs(numOfJobs)
    });
  }

  const results = algorithms.map((algorithm) => {
    const algorithmFunc = getAlgorithm(algorithm);
    const algorithmExecutionResults = randomExperimentsInfo.map((randomExperimentInfo) => {
      params.jobs = randomExperimentInfo.randomExperiment;
      const schedule =  algorithmFunc(params);
      const totalDelay = calculateScheduleDelay(schedule);
      return [randomExperimentInfo.numOfJobs, totalDelay];
    });

    return {
      algorithm,
      data: algorithmExecutionResults
    };
  });

  return results;
};

module.exports = {
  getNumOfJobsResults: getResults
};