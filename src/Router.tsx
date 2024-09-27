import {
  RouteObject,
  createBrowserRouter,
} from 'react-router-dom';

const routes: Array<RouteObject> = [
  {
    id: 'root',
    path: '',
    element: <h1>Hola mundo</h1>,
  },
  {
    id: 'login',
    path: 'login',
    lazy: () => import('./apps/Auth/pages/Login')
      .then(module => ({ Component: module.default, })),
  },
  {
    id: 'signup',
    path: 'signup',
    lazy: () => import('./apps/Auth/pages/Signup')
      .then(module => ({ Component: module.default, })),
  }
];

const router = createBrowserRouter(routes);

export default router;