import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import ReactDOM from 'react-dom/client';

import router from './router';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <RouterProvider router={router} />
  </Suspense>,
);
