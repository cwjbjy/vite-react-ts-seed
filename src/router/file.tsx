/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';

const File = lazy(() => import('../pages/file'));

const file = [
  {
    path: '/file',
    element: <File />,
  },
];

export default file;
