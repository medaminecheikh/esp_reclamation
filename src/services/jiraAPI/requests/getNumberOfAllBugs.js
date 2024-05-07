import axios from 'axios';
import { jiraAuth } from "../utils/jiraConst";
async function getNumberOfAllBugs() {
    try {
        const JIRA_USERNAME = jiraAuth.username;
        const JIRA_PASSWORD = jiraAuth.password;
        // Make a GET request to the Jira API to retrieve all bugs
        const response = await axios.get('http://localhost:8080/rest/api/2/search', {
            params: {
                jql: 'issuetype = Bug', // Filter for bugs
                maxResults: 0 // We only need the count, so set maxResults to 0
            },
            headers: {
                'Authorization': `Basic ${btoa(`${JIRA_USERNAME}:${JIRA_PASSWORD}`)}`,
                'Content-Type': 'application/json'
            }
        });

        // Extract the total number of bugs from the response data
        const numberOfBugs = response.data.total;

        // Return the number of bugs
        return numberOfBugs;
    } catch (error) {
        console.error('Error retrieving number of bugs:', error);
        throw error;
    }
}

export default getNumberOfAllBugs;