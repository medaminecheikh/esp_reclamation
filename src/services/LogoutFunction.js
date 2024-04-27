
import { useNavigate  } from 'react-router-dom';

 function LogoutFunction() {
    const navigate = useNavigate (); 
     const handleLogout =async  () => {
    // Clear storage (consider using secure methods)
    localStorage.clear(); // Clear local storage
    sessionStorage.clear(); // Clear session storage (if used)
    
    navigate('/login');
    }
  return (
     handleLogout
  )
}
export default LogoutFunction;