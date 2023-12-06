import HttpClient from '../utils/axios';

import type { DataType } from '@/pages/context';

export const addData = (params: DataType) => {
  return HttpClient.post('/addData', params);
};

export const getData = () => {
  return HttpClient.get('/getAllData');
};
