const generateRandomJobs = (numberOfJobs = 10) => {
  const jobs = [];

  for (let i = 0; i < numberOfJobs; i++) {
    jobs[i] = randomJobFactory();
  }

  return jobs;
};

const randomJobFactory = () => ({
  duration: Math.round(Math.random() * 10 + 1),
  deadline: Math.round(Math.random() * 20 + 1)
});

module.exports = {
  generateRandomJobs
};
