const { greedy } = require('../../algorithms/greedy');
const { generateRandomJobs } = require('../../helpers/jobFactory.helper');
const { calculateDelay } = require('../../helpers/delayCalculator.helper');

const getGreedyDelay = (numberOfJobs) => {
  const jobs = generateRandomJobs(numberOfJobs);
  const orderedJobs = greedy(jobs);
  const delay = calculateDelay(orderedJobs);

  return { delay };
};

module.exports = {
  getGreedyDelay
};