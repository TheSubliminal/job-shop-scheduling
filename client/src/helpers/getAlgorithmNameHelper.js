import algorithms from '../config/algorithms.json';

export const getAlgorithmName = (algorithmKey) => {
  const algorithm = Object.values(algorithms).find(({ key }) => key === algorithmKey);
  return algorithm && algorithm.name;
};