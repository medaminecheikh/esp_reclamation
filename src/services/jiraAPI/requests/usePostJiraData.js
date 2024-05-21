import axios from 'axios';

async function UsePostJiraIssue (postData) {
  

    const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
    try {
      const url = 'http://localhost:8086/api/jira/addissues';
      const config = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${storedUserData.token}` // Include the bearer token in the Authorization header
      },
      };
      const response = await axios.post(url, postData, config);
      return response;
    } catch (error) {
      console.log(error);
      throw error; // Throw the error to propagate it to the calling code
    }
  }


export default UsePostJiraIssue;
