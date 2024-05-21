import axios from 'axios';
async function getNumberOfPendingTasks() {
    try {
        const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
        // Make a GET request to the Jira API to retrieve completed tasks
        const response = await axios.get('http://localhost:8086/api/jira/getNumberOfPendingTasks', {
            headers: {
                'Authorization': `Bearer ${storedUserData.token}` // Include the bearer token in the Authorization header
            },
        });

        // Extract the total number of pending tasks from the response data
        const numberOfPendingTasks = response.data.total;

        // Return the number of pending tasks
        return numberOfPendingTasks;
    } catch (error) {
        console.error('Error retrieving number of pending tasks:', error);
        throw error;
    }
}

export default getNumberOfPendingTasks;