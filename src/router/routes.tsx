/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';

import ErrorBoundary from '../pages/errorBoundary';

const Login = lazy(() => import('../pages/login'));
const Home = lazy(() => import('../pages/home'));
const User = lazy(() => import('../pages/user'));
const Manage = lazy(() => import('../pages/manage'));
const File = lazy(() => import('../pages/file'));
const Info = lazy(() => import('../pages/info'));
const Graph = lazy(() => import('../pages/graph'));

const routes = [
  {
    path: '/',
    element: <Graph />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <Home />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/user',
        element: <User />,
      },
      {
        path: '/manage',
        element: <Manage />,
      },
      {
        path: '/file',
        element: <File />,
      },
      {
        path: '/info',
        element: <Info />,
      },
    ],
  },
  {
    path: '*',
    element: <div>404</div>,
  },
];

export default routes;
