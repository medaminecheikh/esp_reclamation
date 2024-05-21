import axios from 'axios';

async function PostAttachIssue(key, attachmentData) {
  const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
    try {
      const formData = new FormData();
    formData.append('file', attachmentData);
      const url = `http://localhost:8086/api/jira/PostAttachIssue/${key}`;
      const config = {
        method: 'POST',
        maxBodyLength: Infinity,
        headers: {
          'Authorization': `Bearer ${storedUserData.token}`, // Include the bearer token in the Authorization header
          'Content-Type': 'multipart/form-data', 
       
        }
      };
     
      const response = await axios.post(url, formData, config);
       
      return response;
    } catch (error) {
      console.error('Error posting JIRA attachment:', error);
      throw error; // Throw the error to propagate it to the calling code
    }
  }


export default PostAttachIssue;
