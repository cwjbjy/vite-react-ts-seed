/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';

const Home = lazy(() => import('@/pages/home'));

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '*',
    element: <div>404</div>,
  },
];

export default routes;
