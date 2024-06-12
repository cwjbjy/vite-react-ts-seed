import { lazy } from 'react';

import LazyImportComponent from '@/components/lazyImportComponent';

import ErrorBoundary from '../pages/errorBoundary';

const routes = [
  {
    path: '/login',
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/login'))} />,
  },
  {
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/home'))} />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/user'))} />,
      },
      {
        path: '/manage',
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/manage'))} />,
      },
      {
        path: '/file',
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/file'))} />,
      },
      {
        path: '/info',
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/info'))} />,
      },
    ],
  },
  {
    path: '*',
    element: <div>404</div>,
  },
];

export default routes;
