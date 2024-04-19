import {useEffect, useState} from 'react';
import axios from 'axios';
import {jiraAuth} from "../utils/jiraConst";


 function UseGetJiraData() {
    const [data, setData] = useState(null);

    const [error, setError] = useState(null);

    const JIRA_USERNAME = jiraAuth.username;
    const JIRA_PASSWORD = jiraAuth.password;
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/rest/api/2/project',
        headers: {
            'Authorization': `Basic ${btoa(`${JIRA_USERNAME}:${JIRA_PASSWORD}`)}`
            , 'Content-Type': 'application/json'
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            console.log('Get Jira called');
            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setData(response.data);
                })
                .catch((error) => {
                    setError(error);
                    console.log(error);

                });
        };

        fetchData();
    }, []); // Re-run when these dependencies change

    return {data, error};
}

export default UseGetJiraData;
