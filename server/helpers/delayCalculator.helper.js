const calculateJobEndTimes = (jobs) => {
  const endTimes = [];

  for (let i = 0; i < jobs.length; i++) {
    if (i > 0) {
      endTimes[i] = endTimes[i - 1] + jobs[i].duration;
    } else {
      endTimes[i] = jobs[i].duration;
    }
  }

  return endTimes;
};

const calculateDelay = (jobs) => {
  const endTimes = calculateJobEndTimes(jobs);

  const delays = jobs.map((job, index) => {
    const jobEndTime = endTimes[index];
    const delay = Math.max(0, jobEndTime - job.deadline);

    return delay;
  });

  const totalDelay = delays.reduce((sum, currentDelay) => sum + currentDelay, 0);
  return totalDelay;
};


module.exports = {
  calculateJobEndTimes,
  calculateDelay
};
