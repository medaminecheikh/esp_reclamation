import axios from 'axios';
async function GetIssueById(id) {
try{
  const UserId =id;
  const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:8086/api/jira/GetIssueById/${UserId}`,
        headers: {
          'Authorization': `Bearer ${storedUserData.token}` // Include the bearer token in the Authorization header
      },
    };
    const response = await axios.request(config);
       
    return response;
  } catch (error) {
    console.error('Error posting JIRA get Issue by id:', error);
    throw error; // Throw the error to propagate it to the calling code
  }
}

export default GetIssueById