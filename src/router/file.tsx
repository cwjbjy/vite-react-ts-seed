import { lazy } from 'react';

import LazyImportComponent from '@/components/lazyImportComponent';

const file = [
  {
    path: '/file',
    element: <LazyImportComponent lazyChildren={lazy(() => import('../pages/file'))} />,
  },
];

export default file;
