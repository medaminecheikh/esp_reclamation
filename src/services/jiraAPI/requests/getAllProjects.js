import axios from 'axios';

async function getAllProjects() {
    try{
      
      const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8086/api/jira/allprojects`,
            headers: {
              'Authorization': `Bearer ${storedUserData.token}` // Include the bearer token in the Authorization header
          }
        };
        const response = await axios.request(config);
      
        return response.data;
      } catch (error) {
        console.error('Error :', error);
        
      }
    }

export default getAllProjects