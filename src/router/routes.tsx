/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';

import ErrorBoundary from '../pages/errorBoundary';

import file from './file';
import manage from './manage';

const Login = lazy(() => import('../pages/login'));
const Home = lazy(() => import('../pages/home'));
const User = lazy(() => import('../pages/user'));

const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <Home />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <User />,
      },
      ...file,
      ...manage,
    ],
  },
  {
    path: '*',
    element: <div>404</div>,
  },
];

export default routes;
