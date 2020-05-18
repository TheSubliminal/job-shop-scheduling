const defaults = require('../config/default.json');

const generateRandomJobs = (numberOfJobs = 10) => {
  const jobs = [];

  for (let i = 0; i < numberOfJobs; i++) {
    jobs[i] = {
      id: i + 1,
      duration: Math.round(Math.random() * defaults.randomMaxJobDuration),
      deadline: Math.round(Math.random() * (i + 1) * defaults.randomMaxJobDuration + 1)
    };
  }

  return jobs;
};


module.exports = {
  generateRandomJobs
};