import callWebApi from '../helpers/webApiHelper';

export const getAlgorithmResult = async params => {
  const response = await callWebApi({
    endpoint: '/api/algorithms',
    type: 'POST',
    requestData: params
  });
  return response.json();
};