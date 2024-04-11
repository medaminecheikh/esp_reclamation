const JIRA_BASE_URL = 'https://esprit-team-mjs4csggjn2y.atlassian.net/rest/api/2';
const JIRA_USERNAME = 'mohamedamine.cheikh1@esprit.tn';
const JIRA_PASSWORD = 'ATATT3xFfGF0M-t9opfvd-qwUIfVxpqPEu_v30wJ1XQ1DeNrTIIr2nM45WPBq7jaQV-isCQWFSnnxO7GitBUKSkIknrTPGa6RXMtUyfchfHMvhbv-dgY7fHEfcaaimYkkrI8Amq4iXlWkX42CMoVEG2XNEH135G1B1jNFaxrDdA_Q7nz_bzf8GE=6E11DAF3'; // Consider secure storage or environment variables

export const jiraBaseUrl = JIRA_BASE_URL;
export const jiraAuth = { username: JIRA_USERNAME, password: JIRA_PASSWORD };

// Add authentication headers to axios requests if needed
