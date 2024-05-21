import axios from 'axios';
async function DeleteIssue(id) {
    try{
      const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
        const UserId =id;
        
          let config = {
              method: 'DELETE',
              maxBodyLength: Infinity,
              url: `http://localhost:8086/api/jira/DeleteIssue/${UserId}`,
              headers: {
                'Authorization': `Bearer ${storedUserData.token}` // Include the bearer token in the Authorization header
             }
          };
          const response = await axios.request(config);
             
          return response;
        } catch (error) {
          console.error('Error posting JIRA get Issue by id:', error);
          throw error; // Throw the error to propagate it to the calling code
        }
      }

export default DeleteIssue