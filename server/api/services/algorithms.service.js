const { greedy } = require('../../algorithms/greedy');
const { antColony } = require('../../algorithms/antColony');
const algorithms = require('../../config/algorithms.json');
const { generateRandomJobs } = require('../../helpers/jobFactory.helper');

const getResult = ({ algorithm, numOfRandomJobs, ...params }) => {
  let algorithmFunc;
  switch (algorithm) {
    case algorithms.aco.key:
      algorithmFunc = antColony;
      break;
    case algorithms.greedy.key:
      algorithmFunc = greedy;
      break;
    default:
      algorithmFunc = null;
  }
  if (!algorithmFunc) {
    throw new Error('Algorithm was not selected!');
  }

  if (numOfRandomJobs) {
    params.jobs = generateRandomJobs(numOfRandomJobs);
  }

  return algorithmFunc(params);
};

module.exports = {
  getResult
};