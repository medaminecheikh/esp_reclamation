import axios from 'axios';
import {jiraAuth} from "../utils/jiraConst";


async function getProjectById(props) {
    try{
      
        
          const JIRA_USERNAME = jiraAuth.username;
          const JIRA_PASSWORD = jiraAuth.password;
          let config = {
              method: 'get',
              maxBodyLength: Infinity,
              url: `http://localhost:8080/rest/api/2/project/${props}`,
              headers: {
                  'Authorization': `Basic ${btoa(`${JIRA_USERNAME}:${JIRA_PASSWORD}`)}`
                  , 'Content-Type': 'application/json'
              }
          };
          const response = await axios.request(config);
             
          return response;
        } catch (error) {
          console.error('Error posting JIRA get Issue by id:', error);
          throw error; // Throw the error to propagate it to the calling code
        }
      }

export default getProjectById