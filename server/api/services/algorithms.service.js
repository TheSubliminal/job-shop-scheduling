const { greedy } = require('../../algorithms/greedy');
const schildFredman = require('../../algorithms/schildFredman');
const { antColony } = require('../../algorithms/antColony');

const {
  calculateScheduleDelay,
  calculateJobEndTimes,
  calculateIndividualDelays
} = require('../../helpers/delayCalculator.helper');
const { generateRandomJobs } = require('../../helpers/jobFactory.helper');

const algorithmsDefaults = require('../../config/algorithms.json');

const getResult = ({ algorithms, numOfRandomJobs, ...params }) => {

  if (numOfRandomJobs) {
    params.jobs = generateRandomJobs(numOfRandomJobs);
  }


  const resultSchedules = algorithms.map(algorithm => {
    let algorithmFunc;
    switch (algorithm) {
      case algorithmsDefaults.greedy.key:
        algorithmFunc = greedy;
        break;
      case algorithmsDefaults.schildFredman.key:
        algorithmFunc = schildFredman;
        break;
      case algorithmsDefaults.aco.key:
        algorithmFunc = antColony;
        break;
      default:
        algorithmFunc = null;
    }
    if (!algorithmFunc) {
      throw new Error('Algorithm was not selected!');
    }

    const schedule = algorithmFunc(params);

    const endTimes = calculateJobEndTimes(schedule);
    const delays = calculateIndividualDelays(schedule);
    const totalDelay = calculateScheduleDelay(schedule);

    const scheduleWithEndTimesAndDelays = schedule.map((entry, index) => (
      {
        ...entry,
        endTime: endTimes[index],
        delay: delays[index]
      })
    );

    return  {
      schedule: scheduleWithEndTimesAndDelays,
      totalDelay,
      algorithm
    };
  });

  return resultSchedules;
};

module.exports = {
  getResult
};