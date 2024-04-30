import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import ReclamationRoutes from './ReclamationRoutes';
import { useUser } from '../context/UserContext'; // Import the context

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const { user } = useUser();
  const storedUserData = JSON.parse(sessionStorage.getItem('userData'));

  // Determine the user role from either context or session storage
  const userRole = user?.role || storedUserData?.role;

  // Determine if the user is authenticated from either context or session storage
  const isAuthenticated = !!user || !!storedUserData;
 
  return useRoutes([
    AuthenticationRoutes, // Always render authentication routes
    isAuthenticated && userRole === 'admin' ? MainRoutes : '',
    isAuthenticated && userRole === 'user' ? ReclamationRoutes : '',  ]);
  
}
