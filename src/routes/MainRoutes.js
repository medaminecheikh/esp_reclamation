import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ModifierCompte from '../views/compte/ModifierCompte';
import CreerCompte from '../views/compte/CreerCompte';
import Application from '../views/application';
import Projet from '../views/projet';
import { Navigate } from 'react-router';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //


const MainRoutes = {
  path: '/',
  element: <MainLayout /> ,
  children: [
    {
      path: 'admin',
      children: [
        {
          path: 'dashboard',
          element: <DashboardDefault />
        },
        {
          path: 'gestion',
          children: [
            {
              path: 'compte/ajouter',
              element: <CreerCompte />
            },
            {
              path: 'compte/modifier',
              element: <ModifierCompte />
             
            }
          ]
        },
        {
          path: 'app',
          element: <Application />
        },
        {
          path: 'projet',
          element: <Projet />
        },
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: '*',
      element: <Navigate to="/login" replace={true} />
    }
  ]
};

export default MainRoutes;
