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

    try {
        const response = await axios.get(url, {
            params: params,
            headers: {
                'Authorization': `Basic ${btoa(`${JIRA_USERNAME}:${JIRA_PASSWORD}`)}`,
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