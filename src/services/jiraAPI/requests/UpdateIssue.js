import axios from 'axios';

    export  const transitionIssue = async (issueId) => {
        const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
            try {
              

                 await axios.post(`http://localhost:8086/api/jira/issue/${issueId}/transition-to-done`,{}, {
                    headers: {
                        'Authorization': `Bearer ${storedUserData.token}`, // Include the bearer token in the Authorization header
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Transition successful');
            } catch (error) {
                console.error('Error updating issue status:', error);
            }
        };