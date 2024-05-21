import axios from 'axios';

async function assignIssue(props) {
    console.info(props);
    try {
        const {issueKey, userKey}=props;

      const accountId = userKey; // Assuming userKey is already in the correct format
      const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
      // Construct the request body
   
      const config = {
        method: 'put',
        url: `http://localhost:8086/api/jira/assignIssue/${issueKey}?userKey=${accountId}`,
      
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
  
  export default assignIssue;