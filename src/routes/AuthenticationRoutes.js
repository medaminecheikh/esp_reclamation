import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import { Navigate } from 'react-router';
import Reclamation from '../views/reclamation/reclamation';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <Navigate to="/login" replace={true} />
    },
    {
      path: '/login',
      element: <AuthLogin3 />
    },
    {
      path: '/register',
      element: <AuthRegister3 />
    },
    {
      path: 'esp',
      children: [
        {
          path: 'reclamation',
          element: <Reclamation />
        }
      ]
    },
    {
      path: '*',
      element: <Navigate to="/login" replace={true} />
    }
  ]
};

export default AuthenticationRoutes;
