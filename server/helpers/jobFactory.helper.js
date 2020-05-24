const defaults = require('../config/default.json');

const generateRandomJobs = (
  numberOfJobs = defaults.randomNumOfJobs,
  maxJobDuration = defaults.randomMaxJobDuration
) => {
  const jobs = [];

  for (let i = 0; i < numberOfJobs; i++) {
    jobs[i] = {
      id: i + 1,
      duration: Math.round(Math.random() * maxJobDuration),
      deadline: Math.round(Math.random() * (i + 1) * maxJobDuration + 1)
    };
  }

  return jobs;
};


module.exports = {
  generateRandomJobs
};