import { lazy } from 'react';

import LazyImportComponent from '@/components/lazyImportComponent';

import file from './file';
import manage from './manage';

const routes = [
  {
    path: '/login',
    element: <LazyImportComponent lazyChildren={lazy(() => import('../pages/login'))} />,
  },
  {
    element: <LazyImportComponent lazyChildren={lazy(() => import('../pages/home'))} />,
    children: [
      {
        path: '/',
        element: <LazyImportComponent lazyChildren={lazy(() => import('../pages/user'))} />,
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
