import axios from 'axios'

export default async function RoleGetAll() {
    try {
        const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
     
    
        if (!storedUserData || !storedUserData.token) {
          throw new Error("No token found in session storage");
        }
    
        const url = `http://localhost:8086/api/role/getAll`;
        const data = {}; // Since you're not sending any additional data, an empty object is sufficient
        const token = storedUserData.token;
        const Token = "Bearer " + token;
    
        console.log("Authorization header:", Token);
    
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${url}`,
          headers: {
            'Authorization': Token,
          },
          data: data,
        };
    
        const response = await axios.request(config);
      return response.data;
    } catch (error) {
        console.error('Error get users:', error);
        throw error;
      }
    }

