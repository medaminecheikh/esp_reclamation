import { useState, useEffect } from 'react';
import axios from 'axios';
import {jiraAuth} from "../utils/jiraConst"; // Or use Fetch API if preferred

function UseGetJiraData(url, options = {}) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                if (!jiraAuth.username || !jiraAuth.password) {
                    throw new Error('Missing Jira credentials (REACT_APP_JIRA_USERNAME and REACT_APP_JIRA_PASSWORD)');
                }
                // Customize authentication logic based on your API requirements
                let newOptions = { ...options };
                if (typeof window.btoa === 'function') { // Check for Base64 encoding support
                    const encodedCredentials = btoa(`${jiraAuth.username}:${jiraAuth.password}`);
                    newOptions.headers = {
                        Authorization: `Basic ${encodedCredentials}`, // Basic auth with Base64 encoded credentials
                    };
                } else {
                    console.warn('Base64 encoding not available, authentication might not work.');
                }
                const response = await axios.get(url, newOptions);
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url, ...Object.values(options)]); // Re-fetch on URL or option changes

    return { data, isLoading, error };
}

export default UseGetJiraData;
