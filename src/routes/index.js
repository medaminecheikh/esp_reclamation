import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import ReclamationRoutes from './ReclamationRoutes';
import { useUser } from '../context/UserContext'; // Import the context

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const { user } = useUser();

  return useRoutes([
    AuthenticationRoutes, // Always render authentication routes
    MainRoutes , // Render MainRoutes for admins  user && user.role === 'admin' ?
    user && user.role === 'user' ? ReclamationRoutes : '', // Render ReclamationRoutes for users
  ]);
  
}
