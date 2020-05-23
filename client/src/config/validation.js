import * as Yup from 'yup';

import { maxError, positiveError, requiredError } from './errorMessages.json';
import defaults from './default.json';

export const algorithmChoiceValidationSchema = {
  greedy: Yup.boolean(),
  schildFredman: Yup.boolean(),
  aco: Yup.boolean(),
  numOfRandomJobs: Yup.number().when('isRandom', {
    is: true,
    then: Yup.number()
      .positive(positiveError)
      .max(defaults.maxNumOfRandomJobs, maxError)
      .integer()
      .required(requiredError)
  }),
  numOfAnts: Yup.number().when('aco', {
    is: true,
    then: Yup.number()
      .positive(positiveError)
      .max(defaults.maxNumOfAnts, maxError)
      .integer()
      .required(requiredError)
  }),
  pheromoneSignificanceCoef: Yup.number().when('aco', {
    is: true,
    then: Yup.number()
      .max(defaults.maxPheromoneSignificanceCoef, maxError)
      .positive(positiveError)
  }),
  heuristicSignificanceCoef: Yup.number().when('aco', {
    is: true,
    then: Yup.number()
      .max(defaults.maxHeuristicSignificanceCoef, maxError)
      .positive(positiveError)
  }),
  pheromoneEvaporationCoef: Yup.number().when('aco', {
    is: true,
    then: Yup.number()
      .max(defaults.maxPheromoneEvaporationCoef, maxError)
      .positive(positiveError)
  })
};