const { greedy } = require('../algorithms/greedy');
const schildFredman = require('../algorithms/schildFredman');
const { antColony } = require('../algorithms/antColony');

const algorithmsDefaults = require('../config/algorithms.json');

const getAlgorithm = (algorithmString) => {
  let algorithmFunc;
  switch (algorithmString) {
    case algorithmsDefaults.greedy.key:
      algorithmFunc = greedy;
      break;
    case algorithmsDefaults.schildFredman.key:
      algorithmFunc = schildFredman;
      break;
    case algorithmsDefaults.aco.key:
      algorithmFunc = antColony;
      break;
    default:
      algorithmFunc = null;
  }
  if (!algorithmFunc) {
    throw new Error('Invalid algorithm key was provided!');
  }
  return algorithmFunc;
};

module.exports = {
  getAlgorithm
};