const JIRA_BASE_URL = process.env.REACT_APP_JIRA_DOMAIN;
const JIRA_USERNAME = process.env.REACT_APP_JIRA_USERNAME ;
const JIRA_PASSWORD = process.env.REACT_APP_JIRA_PASSWORD; // Consider secure storage or environment variables

export const jiraBaseUrl = JIRA_BASE_URL;
export const jiraAuth = { username: JIRA_USERNAME, password: JIRA_PASSWORD };


