import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import RecLayout from 'layout/RecLayout/index';
import { Navigate } from 'react-router';


// login option 3 routing
const Reclamation = Loadable(lazy(() => import('views/reclamation/reclamation')));
const HistoriqueReq = Loadable(lazy(() => import('views/historiqueReq/HistoriqueReq')));

// ==============================|| Reclamation ROUTING ||============================== //



const ReclamationRoutes = {
  path: '/',
  element:   <RecLayout /> ,
  children: [
    {
      path: 'esp',
      children: [
        {
          path: 'reclamation',
          element: <Reclamation />
        },{
          path: 'historique',
          element: <HistoriqueReq />
        }
      ]
    },
    {
      path: '*',
      element: <Navigate to="/login" replace={true} />
    }
  ]
};

export default ReclamationRoutes;
