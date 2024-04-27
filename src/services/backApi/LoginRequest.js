import axios from 'axios';

async function LoginRequest({Username,Password}) {

try {
    const url = `http://localhost:8086/auth/authenticate`;
    const data = {}; // Since you're not sending any additional data, an empty object is sufficient

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${url}?Username=${Username}&Password=${Password}`, // Concatenate Username and Password to the URL
      headers: {},
      data: data,
    };

    const response = await axios.request(config);

    console.log(JSON.stringify(response.data)); // Log the response data
    

   
    return response.data;
  } catch (error) {
    console.error('Error Login:', error);
    throw error;
  }
}


export default LoginRequest