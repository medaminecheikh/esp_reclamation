import axios from 'axios';
import { jiraAuth } from '../utils/jiraConst';
async function getAssignableUsers({projectKey, issueKey}) {

const JIRA_USERNAME = jiraAuth.username;
    const JIRA_PASSWORD = jiraAuth.password;
    const url = `http://localhost:8080/rest/api/2/user/assignable/search`;
    const params = {
        project: projectKey,
        issueKey: issueKey
    };

    let config = {
        method: 'get',
        url: url,
        headers: {
            'Authorization': `Basic ${btoa(`${JIRA_USERNAME}:${JIRA_PASSWORD}`)}`,
            'Content-Type': 'application/json'
        },
        params: params // this will add ?project=XXX&issueKey=YYY to the URL
    };

    try {
        const response = await axios.request(config);
        console.log('Assignable Users:', response.data);
        return response.data; // Returning the list of assignable users
    } catch (error) {
        console.error('Error fetching assignable users:', error);
        throw error;
    }
}


export default getAssignableUsers;