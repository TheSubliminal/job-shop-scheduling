const { antColony } = require('../../algorithms/antColony');
const { generateRandomJobs } = require('../../helpers/jobFactory.helper');


const getResults = ({ numOfRandomJobs, maxJobDuration, ...params }) => {
  params.jobs = generateRandomJobs(numOfRandomJobs, maxJobDuration);
  params.isIterationsInfoNecessary = true;

  const results = antColony(params);

  return results;
};

module.exports = {
  getNumOfAntsResults: getResults
};