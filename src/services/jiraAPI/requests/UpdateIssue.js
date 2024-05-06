import axios from 'axios';
import {jiraAuth} from "../utils/jiraConst";


   
        const JIRA_USERNAME = jiraAuth.username;
        const JIRA_PASSWORD = jiraAuth.password;
        
    export    const getTransitions = async (issueId) => {
            try {
                const response = await axios.get(`http://localhost:8080/rest/api/2/issue/${issueId}/transitions`, {
                    headers: {
                        'Authorization': `Basic ${btoa(`${JIRA_USERNAME}:${JIRA_PASSWORD}`)}`, // Adjust with actual credentials
                        'Content-Type': 'application/json'
                    }
                });
                return response.data.transitions;
            } catch (error) {
                console.error('Error fetching transitions:', error);
            }
        };

    export  const transitionIssue = async (issueId, transitionId) => {
            try {
                 await axios.post(`http://localhost:8080/rest/api/2/issue/${issueId}/transitions`, {
                    transition: { id: transitionId }
                }, {
                    headers: {
                        'Authorization': `Basic ${btoa(`${JIRA_USERNAME}:${JIRA_PASSWORD}`)}`, // Adjust with actual credentials
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Transition successful');
            } catch (error) {
                console.error('Error updating issue status:', error);
            }
        };