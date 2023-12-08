import HttpClient from '../utils/axios';

import type { DataType } from '@/pages/context';

export const addData = (params: DataType) => {
  return HttpClient.post('/addData', params);
};

export const getData = () => {
  return HttpClient.get('/getAllData');
};

export const getEarnings = (params: { date: string }) => {
  return HttpClient.get('/getEarnings', { params });
};

export const login = (params: { username: string }) => {
  return HttpClient.get('/financialLogin', { params });
};
