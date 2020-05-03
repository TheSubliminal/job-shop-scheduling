const greedySearch = (jobs) => {
  const sortedJobs = [...jobs];
  sortedJobs.sort((jobA, jobB) => jobA.deadline - jobB.deadline);

  return sortedJobs;
};
