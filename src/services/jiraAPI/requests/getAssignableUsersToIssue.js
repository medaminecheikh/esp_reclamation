import axios from 'axios';
async function getAssignableUsers({projectKey, issueKey}) {
   
    const url = `http://localhost:8086/api/jira/getAssignableUsers/${projectKey}/${issueKey}`;
 
    const storedUserData = JSON.parse(sessionStorage.getItem('userData'));

    try {
        const response = await axios.get(url, {
    
            headers: {
                'Authorization': `Bearer ${storedUserData.token}` // Include the bearer token in the Authorization header
            }
        });
        console.log('Assignable Users:', response.data);
        return response.data; // Returning the list of assignable users
    } catch (error) {
        console.error('Error fetching assignable users:', error);
        throw error;
    }
}


export default getAssignableUsers;