import {jiraAuth} from "../utils/jiraConst";
import axios from 'axios';

async function PostAttachIssue(key, attachmentData) {
 const JIRA_USERNAME = jiraAuth.username;
    const JIRA_PASSWORD = jiraAuth.password;
    try {
      const formData = new FormData();
    formData.append('file', attachmentData);
      const url = `http://localhost:8080/rest/api/2/issue/${key}/attachments`;
      const config = {
        method: 'POST',
        maxBodyLength: Infinity,
        headers: {
          'Authorization': `Basic ${btoa(`${JIRA_USERNAME}:${JIRA_PASSWORD}`)}`,
               'Content-Type': 'multipart/form-data', 
          'X-Atlassian-Token': 'no-check'
        }
      };
     
      const response = await axios.post(url, formData, config);
       
      return response;
    } catch (error) {
      console.error('Error posting JIRA attachment:', error);
      throw error; // Throw the error to propagate it to the calling code
    }
  }


export default PostAttachIssue;
