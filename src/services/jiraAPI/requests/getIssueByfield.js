import {useEffect, useState} from 'react';
import axios from 'axios';


function GetIssueByField() {
    const [dataIssueByField, setDataIssueByField] = useState(null);

    const [errorIssueByField, setErrorIssueByField] = useState(null);
    const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
 

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:8086/api/jira/GetIssueByField/'+storedUserData.username,
        headers: {
            'Authorization': `Bearer ${storedUserData.token}` // Include the bearer token in the Authorization header
        },
             
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
