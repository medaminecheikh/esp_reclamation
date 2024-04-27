import axios from 'axios'
import useUser from '../../../context/UserContext'

async function UpdateUser({userUpdate}) {
    try{
        const { user } = useUser();
    
        const url = `http://localhost:8086/api/user/update`;
        const data = {userUpdate}; // Since you're not sending any additional data, an empty object is sufficient
    
        const config = {
          method: 'post',

          maxBodyLength: Infinity,
          url: `${url}`, 
          headers: {
            Authorization: `Bearer ${user.token}` // Include the bearer token in the Authorization header
        },
          data: data,
        };
    
        const response = await axios.request(config);
      return response.data;
    } catch (error) {
        console.error('Error Login:', error);
        throw error;
      }
    }

export default UpdateUser