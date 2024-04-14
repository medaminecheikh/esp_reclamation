import {jiraAuth} from "../utils/jiraConst";
import axios from 'axios';

async function UsePostJiraIssue (postData) {
const JIRA_USERNAME = jiraAuth.username;
    const JIRA_PASSWORD = jiraAuth.password;
    try {
      const url = 'http://localhost:8080/rest/api/2/issue';
      const config = {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`${JIRA_USERNAME}:${JIRA_PASSWORD}`)}`,
          'Content-Type': 'application/json'
        }
      };
      const response = await axios.post(url, postData, config);
      return response;
    } catch (error) {
      console.log(error);
      throw error; // Throw the error to propagate it to the calling code
    }
  }


export default UsePostJiraIssue;
