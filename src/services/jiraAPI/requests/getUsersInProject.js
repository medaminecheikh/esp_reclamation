import axios from 'axios';

async function getUsersInProject(props) {
    try{
      const key=props;
        
      const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
        
      // Construct the request body
   
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:8086/api/jira/getUsersInProject/${key}`,
              headers: {
                'Authorization': `Bearer ${storedUserData.token}` // Include the bearer token in the Authorization header
            }
      
      };
        const response = await axios.request(config);
           
        return response;
      } catch (error) {
        console.error('Error ', error);
        throw error; // Throw the error to propagate it to the calling code
      }
    }


export default getUsersInProject;