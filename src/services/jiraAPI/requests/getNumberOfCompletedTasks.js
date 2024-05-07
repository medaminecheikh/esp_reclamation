import axios from 'axios';
import { jiraAuth } from "../utils/jiraConst";
async function getNumberOfCompletedTasks() {
    try {
        const JIRA_USERNAME = jiraAuth.username;
        const JIRA_PASSWORD = jiraAuth.password;
        // Make a GET request to the Jira API to retrieve completed tasks
        const response = await axios.get('http://localhost:8080/rest/api/2/search', {
            params: {
                jql: 'status = Done', // Filter for tasks that are marked as done
                maxResults: 1000 // Adjust maxResults as needed to retrieve all completed tasks
            },
            headers: {
                'Authorization': `Basic ${btoa(`${JIRA_USERNAME}:${JIRA_PASSWORD}`)}`,
                'Content-Type': 'application/json'
            }
        });

        // Extract the total number of completed tasks from the response data
        const numberOfCompletedTasks = response.data.total;

        // Return the number of completed tasks
        return numberOfCompletedTasks;
    } catch (error) {
        console.error('Error retrieving number of completed tasks:', error);
        throw error;
    }
}

export default getNumberOfCompletedTasks;