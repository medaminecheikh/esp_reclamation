import {useState} from 'react';
import axios from 'axios';

function usePostJiraData(url, data) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null); // Track response for success

    const submitData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(url, data);
            setResponse(response); // Store response for success handling
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, error, response, submitData };
}

export default usePostJiraData;
