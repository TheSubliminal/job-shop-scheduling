const { calculateJobEndTimes } = require('../helpers/delayCalculator.helper');

const findFirstJobWithoutDelay = (jobs, jobEndTimes, currentJobWithoutDelayIndex) => {
  const startingIndex = currentJobWithoutDelayIndex !== undefined
    ? currentJobWithoutDelayIndex + 1
    : 0;

  for (let i = startingIndex; i < jobs.length; i++) {
    const jobEndTime = jobEndTimes[i];
    const jobDeadline = jobs[i].deadline;
    const delay = jobEndTime - jobDeadline;

    if (delay <= 0) {
      return i;
    }
  }
};

const calculateAverageDelay = (schedule, jobEndTimes, jobWithoutDelayIndex, currentJobIndex) => {
  const {
    duration: currentJobDuration,
    deadline: currentJobDeadline
  } = schedule[currentJobIndex];
  const currentJobEndTime = jobEndTimes[currentJobIndex];

  const jobWithoutDelayDeadline = schedule[jobWithoutDelayIndex].deadline;
  const jobWithoutDelayEndTime = jobEndTimes[jobWithoutDelayIndex];

  const jobWithoutDelayMargin = jobWithoutDelayDeadline - jobWithoutDelayEndTime;

  const durationOfJobsInBetween = schedule
    .slice(jobWithoutDelayIndex, currentJobIndex)
    .reduce((sum, curr) => sum + curr.duration, 0);

  const swapLoss = currentJobDuration * (currentJobIndex - 1 - jobWithoutDelayIndex) - Math.min(currentJobDuration, jobWithoutDelayMargin);
  const swapProfit = -durationOfJobsInBetween + Math.max(currentJobDeadline - (currentJobEndTime - durationOfJobsInBetween), 0);

  return swapLoss + swapProfit;
};

const moveCurrentJobBeforeJobWithoutDelay = (schedule, jobWithoutDelayIndex, currentJobIndex) => {
  const scheduleCopy = [...schedule];

  // Remove and retrieve current job from schedule
  const [currentJob] = scheduleCopy.splice(currentJobIndex, 1);
  // Insert removed job before the job without delay
  scheduleCopy.splice(jobWithoutDelayIndex, 0, currentJob);

  return scheduleCopy;
};

const schildFredman = ({ jobs }) => {
  jobs.sort((jobA, jobB) => jobA.duration - jobB.duration);

  const numOfJobs = jobs.length;

  let currentSchedule =  [...jobs];

  let jobEndTimes = calculateJobEndTimes(currentSchedule);
  let jobWithoutDelayIndex = findFirstJobWithoutDelay(currentSchedule, jobEndTimes);

  while (jobWithoutDelayIndex !== undefined) {
    for (let j = jobWithoutDelayIndex + 1; j < numOfJobs; j++) {
      const averageDelay = calculateAverageDelay(currentSchedule, jobEndTimes, jobWithoutDelayIndex, j);

      if (averageDelay < 0) {
        currentSchedule = moveCurrentJobBeforeJobWithoutDelay(currentSchedule, jobWithoutDelayIndex, j);
        break;
      }
    }

    jobEndTimes = calculateJobEndTimes(currentSchedule);
    jobWithoutDelayIndex = findFirstJobWithoutDelay(currentSchedule, jobEndTimes, jobWithoutDelayIndex);
  }

  return currentSchedule;
};

module.exports = schildFredman;