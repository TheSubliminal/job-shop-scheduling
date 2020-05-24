import callWebApi from '../helpers/webApiHelper';

export const getTimeComplexityStats = async params => {
  const response = await callWebApi({
    endpoint: '/api/stats/time-complexity',
    type: 'POST',
    requestData: params
  });
  return response.json();
};

export const getJobDurationStats = async params => {
  const response = await callWebApi({
    endpoint: '/api/stats/job-duration',
    type: 'POST',
    requestData: params
  });
  return response.json();
};

export const getNumOfJobsStats = async params => {
  const response = await callWebApi({
    endpoint: '/api/stats/num-of-jobs',
    type: 'POST',
    requestData: params
  });
  return response.json();
};

export const getNumOfAntsStats = async params => {
  const response = await callWebApi({
    endpoint: '/api/stats/num-of-ants',
    type: 'POST',
    requestData: params
  });
  return response.json();
};