/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';

import * as path from '@/config/path';

const Home = lazy(() => import('@/pages/home'));
const Login = lazy(() => import('@/pages/login'));

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: path.LOGIN,
    element: <Login />,
  },
  {
    path: '*',
    element: <div>404</div>,
  },
];

export default routes;
