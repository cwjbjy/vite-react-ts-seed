import { lazy } from 'react';

import LazyImportComponent from '@/components/lazyImportComponent';

const manage = [
  {
    path: '/manage',
    element: <LazyImportComponent lazyChildren={lazy(() => import('../pages/manage'))} />,
  },
];

export default manage;
