import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import ErrorBoundary from '@/components/errorBoundary';
import LazyImportComponent from '@/components/lazyImportComponent';

import { protectedLoader } from './loader';
import { usersLoader } from './loader';
import { tokenLoader } from './loader';

const routes = [
  {
    path: '/login',
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/login'))} />,
  },
  {
    path: '/',
    loader: protectedLoader,
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/layout'))} />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to={'/user'} replace={true} />,
      },
      {
        path: '/user',
        loader: usersLoader,
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/user'))} />,
      },
      {
        path: '/manage',
        loader: tokenLoader,
        element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/manage'))} />,
      },
      {
        path: '/file/:id?',
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
    element: <LazyImportComponent lazyChildren={lazy(() => import('@/pages/notFound'))} />,
  },
];

export default routes;
