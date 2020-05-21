const { calculateScheduleDelay } = require('../helpers/delayCalculator.helper');
const defaults = require('../config/default.json');

const getNewJobIndex = (params) => {
  const {
    staticRandomParameter,
    notVisitedJobsStatistics,
    probabilities
  } = params;

  let newJobIndex = null;
  const currentRandomParameter = Math.random().toFixed(6);
  if (currentRandomParameter < staticRandomParameter) {
    newJobIndex = notVisitedJobsStatistics.indexOf(Math.max(...notVisitedJobsStatistics));
  } else {
    const probabilityRandomParameter = Math.random().toFixed(6);
    let startOfInterval = 0.0;
    for (let n = 0; n < probabilities.length; n++) {
      const endOfInterval = startOfInterval + probabilities[n];
      if (startOfInterval < probabilityRandomParameter && probabilityRandomParameter <= endOfInterval) {
        newJobIndex = n;
        break;
      }
      startOfInterval += probabilities[n];
    }
  }
  return newJobIndex;
};

const getNotVisitedJobsStatistics = (params) => {
  const {
    currentNotVisitedJobs,
    iJobPosition,
    pheromoneMatrix,
    pheromoneSignificanceCoef,
    heuristicMatrix,
    heuristicSignificanceCoef
  } = params;

  const notVisitedJobsStatistics = [];
  for (let n = 0; n < currentNotVisitedJobs.length; n++) {
    if (currentNotVisitedJobs[n] !== undefined) {
      const pheromonePart = pheromoneMatrix[iJobPosition][n] ** pheromoneSignificanceCoef;
      const heuristicPart = heuristicMatrix[iJobPosition][n] ** heuristicSignificanceCoef;
      notVisitedJobsStatistics[n] = pheromonePart * heuristicPart;
    } else {
      notVisitedJobsStatistics[n] = 0;
    }
  }
  return notVisitedJobsStatistics;
};

const getProbabilities = (params) => {
  const {
    notVisitedJobsStatistics,
    iJobPosition,
    currentNotVisitedJobs,
    pheromoneMatrix,
    pheromoneSignificanceCoef,
    heuristicMatrix,
    heuristicSignificanceCoef
  } = params;

  const denominator = notVisitedJobsStatistics.reduce((sum, curr) => sum + curr, 0);
  const probabilities = [];
  for (let n = 0; n < currentNotVisitedJobs.length; n++) {
    if (currentNotVisitedJobs[n] !== undefined) {
      const numeratorPheromonePart = pheromoneMatrix[iJobPosition][n] ** pheromoneSignificanceCoef;
      const numeratorHeuristicPart = heuristicMatrix[iJobPosition][n] ** heuristicSignificanceCoef;
      const numerator = numeratorHeuristicPart * numeratorPheromonePart;
      probabilities[n] = numerator / denominator;
    } else {
      probabilities[n] = 0;
    }
  }
  return probabilities;
};

const antColony = (params) => {
  const {
    jobs,
    numOfAnts = defaults.numOfAnts,
    pheromoneSignificanceCoef = defaults.pheromoneSignificanceCoef,
    heuristicSignificanceCoef = defaults.heuristicSignificanceCoef,
    pheromoneEvaporationCoef = defaults.pheromoneEvaporationCoef
  } = params;

  let currentScheduleRecord = [...jobs];
  let currentTotalDelayRecord = calculateScheduleDelay(currentScheduleRecord);

  const defaultPheromoneVolume = 1 / (numOfAnts * currentTotalDelayRecord);

  const pheromoneMatrix = [];
  const heuristicMatrix = [];

  for (let i = 0; i < currentScheduleRecord.length; i++) {
    pheromoneMatrix[i] = [];
    heuristicMatrix[i] = [];
    for (let j = 0; j < currentScheduleRecord.length; j++) {
      pheromoneMatrix[i][j] = defaultPheromoneVolume;
      heuristicMatrix[i][j] = 1 / jobs[i].deadline;
    }
  }

  for (let ant = 0; ant < numOfAnts; ant++) {
    const staticRandomParameter = Math.random().toFixed(6);

    const notVisitedJobs = [...currentScheduleRecord];
    const newSchedule = new Array(currentScheduleRecord.length);

    for (let iJobPosition = 0; iJobPosition < jobs.length; iJobPosition++) {
      const notVisitedJobsStatistics = getNotVisitedJobsStatistics({
        currentNotVisitedJobs: notVisitedJobs,
        iJobPosition,
        pheromoneMatrix,
        pheromoneSignificanceCoef,
        heuristicMatrix,
        heuristicSignificanceCoef
      });

      const probabilities = getProbabilities({
        notVisitedJobsStatistics,
        iJobPosition,
        currentNotVisitedJobs: notVisitedJobs,
        pheromoneMatrix,
        pheromoneSignificanceCoef,
        heuristicMatrix,
        heuristicSignificanceCoef
      });

      const jJobPosition = getNewJobIndex({
        staticRandomParameter,
        notVisitedJobsStatistics,
        probabilities
      });

      newSchedule[iJobPosition] = notVisitedJobs[jJobPosition];
      pheromoneMatrix[iJobPosition][jJobPosition] = (1 - pheromoneEvaporationCoef) * pheromoneMatrix[iJobPosition][jJobPosition] + defaultPheromoneVolume * 0.01;
      delete notVisitedJobs[jJobPosition];
    }

    for (let i = 0; i < currentScheduleRecord.length; i++) {
      for (let j = 0; j < currentScheduleRecord.length; j++) {
        if (currentScheduleRecord[i] === newSchedule[j]) {
          pheromoneMatrix[i][j] = (1 - pheromoneEvaporationCoef) * pheromoneMatrix[i][j] + defaultPheromoneVolume * 0.4;
        } else {
          pheromoneMatrix[i][j] = (1 - pheromoneEvaporationCoef) * pheromoneMatrix[i][j];
        }
      }
    }

    const newTotalDelay = calculateScheduleDelay(newSchedule);
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