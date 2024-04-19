import {useEffect, useState} from 'react';
import axios from 'axios';
import {jiraAuth} from "../utils/jiraConst";


function GetIssueByField() {
    const [dataIssueByField, setDataIssueByField] = useState(null);

    const [errorIssueByField, setErrorIssueByField] = useState(null);

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
                    jql: `Sendermail ~ "mahmoudi.API@esprit.tn"` // Modify to use fieldValue in JQL
                }
    };
    useEffect(() => {
        const fetchData = async () => {
            console.log('Get GetIssueByField called');
            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
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
