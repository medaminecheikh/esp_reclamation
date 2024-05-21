import axios from 'axios';

async function getAllJiraUsers() {
 

const url = `http://localhost:8086/api/jira/alljirausers`;


let config = {
    method: 'get',
    url: url,
    
    headers: {
        'Authorization': `Bearer ${storedUserData.token}` // Include the bearer token in the Authorization header
    }
};

try {
    const response = await axios.request(config);
    console.log('all Users:', response.data);
    return response.data; // Returning the list of assignable users
} catch (error) {
    console.error('Error fetching  users:', error);
    throw error;
}
}

export default getAllJiraUsers