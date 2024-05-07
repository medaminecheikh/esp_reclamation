import axios from 'axios';
import { jiraAuth } from "../utils/jiraConst";
async function getNumberOfPendingTasks() {
    try {
        const JIRA_USERNAME = jiraAuth.username;
        const JIRA_PASSWORD = jiraAuth.password;
        // Make a GET request to the Jira API to retrieve pending tasks
        const response = await axios.get('http://localhost:8080/rest/api/2/search', {
            params: {
                jql: 'status != Done', // Filter for tasks that are not yet done
                maxResults: 1000 // Adjust maxResults as needed to retrieve all pending tasks
            },
            headers: {
                'Authorization': `Basic ${btoa(`${JIRA_USERNAME}:${JIRA_PASSWORD}`)}`,
                'Content-Type': 'application/json'
            }
        });

        // Extract the total number of pending tasks from the response data
        const numberOfPendingTasks = response.data.total;

        // Return the number of pending tasks
        return numberOfPendingTasks;
    } catch (error) {
        console.error('Error retrieving number of pending tasks:', error);
        throw error;
    }
}

export default getNumberOfPendingTasks;