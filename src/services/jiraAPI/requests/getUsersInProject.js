import axios from 'axios';
import {jiraAuth} from "../utils/jiraConst";

async function getUsersInProject(props) {
    try{
      const key=props;
        
        const JIRA_USERNAME = jiraAuth.username;
        const JIRA_PASSWORD = jiraAuth.password;
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8080/rest/api/2/user/search/query?query=is%20assignee%20of%20${key}`,
            headers: {
                'Authorization': `Basic ${btoa(`${JIRA_USERNAME}:${JIRA_PASSWORD}`)}`
                , 'Content-Type': 'application/json'
            }
        };
        const response = await axios.request(config);
           
        return response;
      } catch (error) {
        console.error('Error ', error);
        throw error; // Throw the error to propagate it to the calling code
      }
    }


export default getUsersInProject;