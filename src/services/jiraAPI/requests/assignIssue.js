import axios from 'axios';
import { jiraAuth } from '../utils/jiraConst';

async function assignIssue(props) {
    console.info(props);
    try {
        const {issueKey, userKey}=props;
      const JIRA_USERNAME = jiraAuth.username;
      const JIRA_PASSWORD = jiraAuth.password;
      const accountId = userKey; // Assuming userKey is already in the correct format
        
      // Construct the request body
      const bodyData = {
        name: accountId
      };
      const config = {
        method: 'put',
        url: `http://localhost:8080/rest/api/2/issue/${issueKey}/assignee`,
        headers: {
          'Authorization': `Basic ${btoa(`${JIRA_USERNAME}:${JIRA_PASSWORD}`)}`,
          'Content-Type': 'application/json'
        },
        data: bodyData
      };
  
      const response = await axios.request(config);
      return response;
    } catch (error) {
      console.error('Error assigning issue:', error);
      throw error;
    }
  }
  
  export default assignIssue;