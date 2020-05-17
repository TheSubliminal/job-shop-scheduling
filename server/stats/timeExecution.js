const { generateRandomJobs } = require('../helpers/jobFactory.helper');

const { greedy } = require('../algorithms/greedy');
const { antColony } = require('../algorithms/antColony');
const schildFredman = require('../algorithms/schildFredman');

const maxNumberOfJobs = 1000;

const result = [];
for (let i = 1; i < maxNumberOfJobs + 1; i++) {
  if (i % 20 === 0) {

    const randomJobs = generateRandomJobs(i);

    const startGreedy = Date.now();
    greedy({jobs: randomJobs});
    const endGreedy = Date.now();

    const startAntColony = Date.now();
    antColony({jobs: randomJobs, numOfAnts: 20});
    const endAntColony = Date.now();

    const startSchildFredman = Date.now();
    schildFredman({jobs: randomJobs});
    const endSchildFredman = Date.now();

    result.push({
      numberOfJobs: i,
      greedyResult: endGreedy - startGreedy,
      antColonyResult: endAntColony - startAntColony,
      schildFredmanResult: endSchildFredman - startSchildFredman,
    });
  }
}

console.info(result);
