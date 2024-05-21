import axios from 'axios';

async function getAverageResolutionTime() {
   
    const storedUserData = JSON.parse(sessionStorage.getItem('userData'));

    try {
        // Retrieve issues using JQL query
        const response = await axios.get('http://localhost:8086/api/jira/getAverageResolutionTime', {
       
        headers: {
            'Authorization': `Bearer ${storedUserData.token}` // Include the bearer token in the Authorization header
        }
        });

        const issues = response.data.issues;
console.log("AVERAGE",response)
        // Calculate total resolution time and total number of resolved issues
        let totalResolutionTime = 0;
        let resolvedIssuesCount = 0;

        issues.forEach(issue => {
            const created = new Date(issue.fields.created);
            const resolved = new Date(issue.fields.resolutiondate);
            const resolutionTime = resolved.getTime() - created.getTime();

            totalResolutionTime += resolutionTime;
            resolvedIssuesCount++;
        });

        // Calculate average resolution time
        const averageResolutionTimeMs  = totalResolutionTime / resolvedIssuesCount;
        const averageResolutionTime = msToHumanReadable(averageResolutionTimeMs);
        console.log("averageResolutionTime",averageResolutionTime)
        // Return the average resolution time (in milliseconds)
        return averageResolutionTime;
    } catch (error) {
        console.error('Error calculating average resolution time:', error);
        throw error;
    }
}
// Function to convert milliseconds to a human-readable format
function msToHumanReadable(milliseconds) {
    const weeks = Math.floor(milliseconds / (1000 * 60 * 60 * 24 * 7));
    milliseconds %= (1000 * 60 * 60 * 24 * 7);
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    milliseconds %= (1000 * 60 * 60 * 24);
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));

    let result = '';
    if (weeks > 0) {
        result += `${weeks} week${weeks > 1 ? 's' : ''} `;
    }
    if (days > 0) {
        result += `${days} day${days > 1 ? 's' : ''} `;
    }
    if (hours > 0) {
        result += `${hours} hour${hours > 1 ? 's' : ''} `;
    }

    return result.trim();
}
export default getAverageResolutionTime;