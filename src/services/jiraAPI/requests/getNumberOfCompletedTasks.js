import axios from 'axios';
async function getNumberOfCompletedTasks() {
    try {
        const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
        // Make a GET request to the Jira API to retrieve completed tasks
        const response = await axios.get('http://localhost:8086/api/jira/getNumberOfCompletedTasks', {
            headers: {
                'Authorization': `Bearer ${storedUserData.token}` // Include the bearer token in the Authorization header
            },
        });

        // Extract the total number of completed tasks from the response data
        const numberOfCompletedTasks = response.data.total;

        // Return the number of completed tasks
        return numberOfCompletedTasks;
    } catch (error) {
        console.error('Error retrieving number of completed tasks:', error);
        throw error;
    }
}

export default getNumberOfCompletedTasks;