import {useEffect, useState} from 'react';
import UseGetJiraData from "../../../../services/jiraAPI/requests/UseGetJiraData";
import buildJiraUrl from "../../../../services/jiraAPI/utils/buildJiraUrl";
import {jiraBaseUrl} from "../../../../services/jiraAPI/utils/jiraConst";

function GetProjects() {
    const [projectOptions, setProjectOptions] = useState([]);
    // Use the fetched data (remove unused variables)
    const [ setIsLoading] = useState(false);

    // Build the desired Jira API URL
    const baseUrl = jiraBaseUrl // Replace with your Jira domain
    const endpoint = '/project/search';
    const queryParams = { startAt: 0, maxResults: 50 }; // Adjust query parameters as needed
    const url = buildJiraUrl(baseUrl, endpoint, queryParams); // Optional: Use buildJiraUrl function if present

    useEffect(() => {
        const fetchProjectData = async () => {
            setIsLoading(true); // Set loading state

            const { data, isLoading: hookIsLoading, error: hookError } = await UseGetJiraData(url);

            if (hookError) {
                console.error('Error fetching data:', hookError); // Log error for debugging (optional)
            } else {
                const options = data.values.map((project) => ({
                    value: project.id, // Project ID as value
                    label: project.name, // Project name as label
                }));
                setProjectOptions(options);
            }

            setIsLoading(hookIsLoading); // Update loading state based on hook
        };

        fetchProjectData();
    }, []); // Empty dependency array: fetch data on component mount

    return projectOptions;
}

export default GetProjects;
