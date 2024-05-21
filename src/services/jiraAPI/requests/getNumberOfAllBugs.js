import axios from 'axios';

async function getNumberOfAllBugs() {
    try {
        const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
        // Make a GET request to the Jira API to retrieve all bugs
        const response = await axios.get('http://localhost:8086/api/jira/getNumberOfAllBugs', {
         
            headers: {
                'Authorization': `Bearer ${storedUserData.token}` // Include the bearer token in the Authorization header
            },
        });

        // Extract the total number of bugs from the response data
        const numberOfBugs = response.data.total;

        // Return the number of bugs
        return numberOfBugs;
    } catch (error) {
        console.error('Error retrieving number of bugs:', error);
        throw error;
    }
}

export default getNumberOfAllBugs;