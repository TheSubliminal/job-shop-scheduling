const { greedy } = require('../../algorithms/greedy');
const schildFredman = require('../../algorithms/schildFredman');
const { antColony } = require('../../algorithms/antColony');

const {
  calculateScheduleDelay,
  calculateJobEndTimes,
  calculateIndividualDelays
} = require('../../helpers/delayCalculator.helper');
const { generateRandomJobs } = require('../../helpers/jobFactory.helper');

const algorithms = require('../../config/algorithms.json');

const getResult = ({ algorithm, numOfRandomJobs, ...params }) => {
  let algorithmFunc;
  switch (algorithm) {
    case algorithms.greedy.key:
      algorithmFunc = greedy;
      break;
    case algorithms.schildFredman.key:
      algorithmFunc = schildFredman;
      break;
    case algorithms.aco.key:
      algorithmFunc = antColony;
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

  const schedule = algorithmFunc(params);

  const endTimes = calculateJobEndTimes(schedule);
  const delays = calculateIndividualDelays(schedule);
  const totalDelay = calculateScheduleDelay(schedule);

  const scheduleWithEndTimesAndDelays = schedule.map((entry, index) => {
    return {
      ...entry,
      endTime: endTimes[index],
      delay: delays[index]
    };
  });

  return {
    schedule: scheduleWithEndTimesAndDelays,
    totalDelay
  };
};

module.exports = {
  getResult
};