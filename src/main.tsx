import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import ReactDOM from 'react-dom/client';

import router from './router';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Suspense fallback={<div>加载中...</div>}>
    <RouterProvider router={router} />
  </Suspense>,
);
