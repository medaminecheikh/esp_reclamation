import {jiraAuth} from "../utils/jiraConst";
import axios from 'axios';

async function PostAttachIssue(key, attachmentData) {
 const JIRA_USERNAME = jiraAuth.username;
    const JIRA_PASSWORD = jiraAuth.password;
    try {
      const url = `http://localhost:8080/rest/api/2/issue/${key}/attachments`;
      const config = {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`${JIRA_USERNAME}:${JIRA_PASSWORD}`)}`,
          'Accept': 'application/json',
          'X-Atlassian-Token': 'no-check'
        }
      };
      const response = await axios.post(url, attachmentData, config);
      return response;
    } catch (error) {
      console.error('Error posting JIRA attachment:', error);
      throw error; // Throw the error to propagate it to the calling code
    }
  }


export default PostAttachIssue;
