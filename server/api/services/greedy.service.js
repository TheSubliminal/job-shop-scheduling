const { greedy } = require('../../algorithms/greedy');
const { generateRandomJobs } = require('../../helpers/jobFactory.helper');
const { calculateDelay } = require('../../helpers/delayCalculator.helper');

const getGreedyResult = (numberOfJobs) => {
  const jobs = generateRandomJobs(numberOfJobs);
  const orderedJobs = greedy(jobs);
  const totalDelay = calculateDelay(orderedJobs);

  return { totalDelay, orderedJobs };
};

module.exports = {
  getGreedyResult
};