import axios from 'axios';


async function getUserBySelf(props) {
    console.info(props);
    try {
        const {Url}=props;

        const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
        
      // Construct the request body
   
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:8086/api/jira/getUserBySelf/${Url}`,
              headers: {
                'Authorization': `Bearer ${storedUserData.token}` // Include the bearer token in the Authorization header
            }
      
      };
  
      const response = await axios.request(config);
      return response;
    } catch (error) {
      console.error('Error assigning issue:', error);
      throw error;
    }
  }
export default getUserBySelf