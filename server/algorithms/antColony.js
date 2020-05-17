const { calculateDelay } = require('../helpers/delayCalculator.helper');
const defaults = require('../config/default.json');

const antColony = (params) => {
  const {
    jobs,
    numOfAnts = defaults.numOfAnts,
    pheromoneSignificanceCoef = defaults.pheromoneSignificanceCoef,
    heuristicSignificanceCoef = defaults.heuristicSignificanceCoef,
    pheromoneEvaporationCoef = defaults.pheromoneEvaporationCoef
  } = params;

  const staticRandomParameter = Math.random().toFixed(6);

  let currentScheduleRecord = [...jobs];
  currentScheduleRecord.sort((jobA, jobB) => jobA.deadline - jobB.deadline);
  let currentTotalDelayRecord = calculateDelay(currentScheduleRecord);

  const defaultPheromoneVolume = 1 / numOfAnts * currentTotalDelayRecord;

  const pheromoneMatrix = [];
  const heuristicMatrix = [];

  for (let i = 0; i < currentScheduleRecord.length; i++) {
    pheromoneMatrix[i] = [];
    heuristicMatrix[i] = [];
    for (let j = 0; j < currentScheduleRecord.length; j++) {
      pheromoneMatrix[i][j] = defaultPheromoneVolume;
      heuristicMatrix[i][j] = 1 / currentScheduleRecord[i].deadline;
    }
  }

  for (let k = 0; k < numOfAnts; k++) {
    const notVisitedJobs = [...currentScheduleRecord];
    const newSchedule = new Array(currentScheduleRecord.length);

    for (let i = 0; i < notVisitedJobs.length; i++) {
      const notVisitedJobsStatistics = [];
      for (let n = 0; n < notVisitedJobs.length; n++) {
        if (notVisitedJobs[n] !== undefined) {
          notVisitedJobsStatistics[n] = (pheromoneMatrix[i][n] ** pheromoneSignificanceCoef) * (heuristicMatrix[i][n] ** heuristicSignificanceCoef);
        } else {
          notVisitedJobsStatistics[n] = 0;
        }
      }
      const denominator = notVisitedJobsStatistics.reduce((sum, curr) => sum + curr, 0);
      const probabilities = [];
      for (let j = 0; j < notVisitedJobs.length; j++) {
        if (notVisitedJobs[j] !== undefined) {
          const numerator = pheromoneMatrix[i][j] ** pheromoneSignificanceCoef * heuristicMatrix[i][j] ** heuristicSignificanceCoef;
          probabilities[j] = numerator / denominator;
        } else {
          probabilities[j] = 0;
        }
      }

      let newJobIndex = null;

      const currentRandomParameter = Math.random().toFixed(6);
      if (currentRandomParameter < staticRandomParameter) {
        newJobIndex = notVisitedJobsStatistics.indexOf(Math.max(...notVisitedJobsStatistics));
      } else {
        newJobIndex = probabilities.indexOf(Math.max(...probabilities));
      }

      newSchedule[i] = notVisitedJobs[newJobIndex];

      pheromoneMatrix[i][newJobIndex] = (1 - pheromoneEvaporationCoef) * pheromoneMatrix[i][newJobIndex] + pheromoneEvaporationCoef * defaultPheromoneVolume;

      delete notVisitedJobs[newJobIndex];
    }

    for (let i = 0; i < currentScheduleRecord.length; i++) {
      for (let j = 0; j < currentScheduleRecord.length; j++) {
        if (currentScheduleRecord[i] === newSchedule[j]) {
          pheromoneMatrix[i][j] = (1 - pheromoneEvaporationCoef) * pheromoneMatrix[i][j] + pheromoneEvaporationCoef / currentTotalDelayRecord;
        } else {
          pheromoneMatrix[i][j] = (1 - pheromoneEvaporationCoef) * pheromoneMatrix[i][j];
        }
      }
    }

    const newTotalDelay = calculateDelay(newSchedule);
    if (newTotalDelay < currentTotalDelayRecord) {
      currentScheduleRecord = newSchedule;
      currentTotalDelayRecord = newTotalDelay;
    }
  }
  return currentScheduleRecord;
};

module.exports = {
  antColony
};