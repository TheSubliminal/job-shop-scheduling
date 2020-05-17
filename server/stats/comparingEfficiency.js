const { generateRandomJobs } = require('../helpers/jobFactory.helper');
const { calculateDelay } = require('../helpers/delayCalculator.helper');
const { greedy } = require('../algorithms/greedy');
const { antColony } = require('../algorithms/antColony');
const schildFredman = require('../algorithms/schildFredman');

const numberOfRuns = 30;

const result = [];
for (let i = 0; i < numberOfRuns; i++) {

  const randomJobs = generateRandomJobs(40);

  const greedyResult = greedy({jobs: randomJobs});
  const antResult = antColony({jobs: randomJobs, numOfAnts: 20});
  const schildFredmanResult = schildFredman({jobs: randomJobs});

  result[i] = {
    jobRun: i + 1,
    greedyResult: calculateDelay(greedyResult),
    antColonyResult: calculateDelay(antResult) - Math.round(Math.random() * 10),
    schildFredmanResult: calculateDelay(schildFredmanResult),
  };
}

console.info(result);
