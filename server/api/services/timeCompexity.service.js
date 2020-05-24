const { generateRandomJobs } = require('../../helpers/jobFactory.helper');
const { getAlgorithm } = require('../../helpers/getAlgorithm.helper');


const getResults = ({ algorithms, from, to, step, ...params }) => {
  const results = algorithms.map((algorithm) => {
    const algorithmExecutionResults = [];
    const algorithmFunc = getAlgorithm(algorithm);
    for (let numOfJobs = from; numOfJobs <= to; numOfJobs += step) {
      params.jobs = generateRandomJobs(numOfJobs);

      const startExecution = Date.now();
      algorithmFunc(params);
      const endExecution = Date.now();

      const executionTime = endExecution - startExecution;
      algorithmExecutionResults.push([numOfJobs, executionTime]);
    }

    return {
      algorithm,
      data: algorithmExecutionResults
    };
  });

  return results;
};

module.exports = {
  getTimeComplexityResults: getResults
};