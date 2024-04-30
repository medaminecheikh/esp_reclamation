import {useEffect, useState} from 'react';
import axios from 'axios';
import {jiraAuth} from "../utils/jiraConst";


function GetIssueByField() {
    const [dataIssueByField, setDataIssueByField] = useState(null);

    const [errorIssueByField, setErrorIssueByField] = useState(null);
    const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
    const JIRA_USERNAME = jiraAuth.username;
    const JIRA_PASSWORD = jiraAuth.password;
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/rest/api/2/search',
        headers: {
            'Authorization': `Basic ${btoa(`${JIRA_USERNAME}:${JIRA_PASSWORD}`)}`
            , 'Content-Type': 'application/json'
        },
                params: { // Pass fieldValue as a parameter in the request
                    jql: `Sendermail ~ ${storedUserData.username}` // Modify to use fieldValue in JQL
                }
    };
    useEffect(() => {
        const fetchData = async () => {
            console.log('Get GetIssueByField called');
            axios.request(config)
                .then((response) => {
                 
                    setDataIssueByField(response.data);
                })
                .catch((error) => {
                    setErrorIssueByField(error);
                    console.log(error);

                });
        };

        fetchData();
    }, []); // Re-run when these dependencies change

    return {dataIssueByField, errorIssueByField};
}

export default GetIssueByField;
