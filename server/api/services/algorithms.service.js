const {
  calculateScheduleDelay,
  calculateJobEndTimes,
  calculateIndividualDelays
} = require('../../helpers/delayCalculator.helper');
const { generateRandomJobs } = require('../../helpers/jobFactory.helper');
const { getAlgorithm } = require('../../helpers/getAlgorithm.helper');

const getResults = ({ algorithms, numOfRandomJobs, ...params }) => {

  if (numOfRandomJobs) {
    params.jobs = generateRandomJobs(numOfRandomJobs);
  }

  const resultSchedules = algorithms.map(algorithm => {
    const algorithmFunc = getAlgorithm(algorithm);

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
  getResult: getResults
};