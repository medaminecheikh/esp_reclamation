import axios from 'axios';
import { jiraAuth } from '../utils/jiraConst';

async function getUserBySelf(props) {
    console.info(props);
    try {
        const {Url}=props;
      const JIRA_USERNAME = jiraAuth.username;
      const JIRA_PASSWORD = jiraAuth.password;
      
        
      // Construct the request body
   
      const config = {
        method: 'get',
        url: Url ,
        headers: {
          'Authorization': `Basic ${btoa(`${JIRA_USERNAME}:${JIRA_PASSWORD}`)}`,
          'Content-Type': 'application/json'
        },
      
      };
  
      const response = await axios.request(config);
      return response;
    } catch (error) {
      console.error('Error assigning issue:', error);
      throw error;
    }
  }
export default getUserBySelf