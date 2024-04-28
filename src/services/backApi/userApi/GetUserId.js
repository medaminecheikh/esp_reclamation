import axios from 'axios'

async function GetUserId({id, user}) {
    try {


        const url = `http://localhost:8086/api/user/getBy/${id}`; // Assuming this is the endpoint to delete a user by ID

        const config = {
            method: 'get',
            url: url,
            headers: {
                'Authorization': `Bearer ${user.token}` // Include the bearer token in the Authorization header
            }
        };

        const response = await axios.request(config);
        return response.data;
      } catch (error) {
          console.error('Error Login:', error);
          throw error;
        }
      }

export default GetUserId