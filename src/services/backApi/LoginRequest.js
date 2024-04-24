
async function LoginRequest({Username,Password}) {

 try {
     
      const url = `http://localhost:8086/auth/authentication?Username=${Username}&Password=${Password}`;
      const config = {
        method: 'POST',
        maxBodyLength: Infinity,
       headers: { },
      };
     
      const response = await axios.post(url, config);
          // Store token in session storage
            sessionStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      console.error('Error Login:', error);
      throw error; // Throw the error to propagate it to the calling code
    }
  }

export default LoginRequest