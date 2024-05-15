import axios from 'axios';
import { jiraAuth } from '../utils/jiraConst';

async function getAllJiraUsers() {
 
const JIRA_USERNAME = jiraAuth.username;
const JIRA_PASSWORD = jiraAuth.password;
const url = `http://localhost:8080/rest/api/2/user/search`;


let config = {
    method: 'get',
    url: url,
    
    headers: {
        'Authorization': `Basic ${btoa(`${JIRA_USERNAME}:${JIRA_PASSWORD}`)}`,
        'Content-Type': 'application/json'
    },
    params: {
        maxResults: 1000 // Adjust as needed to fetch more users if necessary
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