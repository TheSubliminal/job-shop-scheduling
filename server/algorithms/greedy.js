const greedy = ({ jobs }) => {
  const sortedJobs = [...jobs];
  sortedJobs.sort((jobA, jobB) => jobA.deadline - jobB.deadline);

  return sortedJobs;
};

module.exports = {
  greedy
};