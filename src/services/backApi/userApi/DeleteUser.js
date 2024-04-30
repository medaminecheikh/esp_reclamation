import axios from 'axios'

async function DeleteUser({id}) {
    try {
        const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
        const url = `http://localhost:8086/api/user/delBy/${id}`; // Assuming this is the endpoint to delete a user by ID

        const config = {
            method: 'delete',
            url: url,
            headers: {
                'Authorization': `Bearer ${storedUserData.token}` // Include the bearer token in the Authorization header
            }
        };

        const response = await axios.request(config);
        return response.data;
      } catch (error) {
          console.error('Error Login:', error);
          throw error;
        }
      }

export default DeleteUser