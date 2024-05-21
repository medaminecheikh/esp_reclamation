import axios from 'axios';

async function GetAllIssues(props) {
    const { site, status, priority } = props;
    const storedUserData = JSON.parse(sessionStorage.getItem('userData'));

    try{

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8086/api/jira/issuesby',
            headers: {
                'Authorization': `Bearer ${storedUserData.token}` // Include the bearer token in the Authorization header
            }, params: {
                site: site ,
                status: status ,
                priority: priority ,
                maxResults: 1000 // Limit the number of results if needed
            },data:{},
        };
        const response = await axios.request(config);
           
        return response;
      } catch (error) {
        console.error('Error posting JIRA get All Issue :', error);
        throw error; // Throw the error to propagate it to the calling code
      }
    }


export default GetAllIssues