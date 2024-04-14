const JIRA_BASE_URL = 'http://localhost:8080/rest/api/2/project';
const JIRA_USERNAME = 'mohamedamine';
const JIRA_PASSWORD = '192JMT2533'; // Consider secure storage or environment variables

export const jiraBaseUrl = JIRA_BASE_URL;
export const jiraAuth = { username: JIRA_USERNAME, password: JIRA_PASSWORD };

// Add authentication headers to axios requests if needed
