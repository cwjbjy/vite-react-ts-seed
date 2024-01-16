/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
const Manage = lazy(() => import('../pages/manage'));

const manage = [
  {
    path: '/manage',
    element: <Manage />,
  },
];

export default manage;
