import axios from 'axios';
import {jiraAuth} from "../utils/jiraConst";

async function GetAllIssues(props) {
    const { site, status, priority } = props;
    console.warn('props',props)
    let jqlFilters = [`project=${site}`];
if (status) {
    jqlFilters.push(`status=${status}`);
}
if (priority) {
    jqlFilters.push(`priority=${priority}`);
}

let jqlQuery = jqlFilters.join(' AND ');
    try{
        const JIRA_USERNAME = jiraAuth.username;
        const JIRA_PASSWORD = jiraAuth.password;
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/rest/api/2/search',
            headers: {
                'Authorization': `Basic ${btoa(`${JIRA_USERNAME}:${JIRA_PASSWORD}`)}`
                , 'Content-Type': 'application/json'
            }, params: {
                jql: jqlQuery ,
                maxResults: 50 // Limit the number of results if needed
            },data:{},
        };
        const response = await axios.request(config);
           
        return response;
      } catch (error) {
        console.error('Error posting JIRA get All Issue :', error);
        throw error; // Throw the error to propagate it to the calling code
      }
    }


export default GetAllIssues