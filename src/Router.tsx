import {
  RouteObject,
  createBrowserRouter,
  redirect,
} from 'react-router-dom';

const routes: Array<RouteObject> = [
  {
    id: 'root',
    path: '',
    children: [
      {
        id: 'home',
        path: '',
        lazy: () => import('./apps/Main/pages/Home')
          .then(module => ({ Component: module.default, })),
      },
      {
        id: 'hotel',
        path: 'hotel/:id',
        // loader: () => {
        //   const token = localStorage.getItem('current_user');
        //   if (!token) return redirect('/login');

        //   return true;
        // },
        lazy: () => import('./apps/Main/pages/SelectedHotel')
          .then(module => ({ Component: module.default, })),
      }
    ],
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