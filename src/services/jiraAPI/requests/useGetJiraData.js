import {useEffect, useState} from 'react';
import axios from 'axios';



 function UseGetJiraData() {
    const [data, setData] = useState(null);

    const [error, setError] = useState(null);
    const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
    const url = `http://localhost:8086/api/jira/allprojects`;
   
  
    useEffect(() => {
        const fetchData = async () => {
            console.log('Get Jira called');
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${storedUserData.token}` // Include the bearer token in the Authorization header
                    },
                    maxBodyLength: Infinity
                });
                console.log('response', response);
                setData(response.data);
            } catch (error) {
                setError(error);
                console.log(error);
            }
        };

        fetchData();
    }, []); // Re-run when these dependencies change

    return {data, error};
}

export default UseGetJiraData;
