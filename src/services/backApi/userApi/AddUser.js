import axios from 'axios'

async function AddUser(props) {
    try{
      console.log('props', props)
      const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
      const {  username, password, role, enabled } = props;
      const data = {
        id :'',
        username,
        password,
        role: {
          id: role.id, // Assuming role is an object with nested id property
          name: role.name,
        },
        enabled,
      }; // Include specific user data // Since you're not sending any additional data, an empty object is sufficient
  
        
        const url = `http://localhost:8086/api/user/add`;
    
        const config = {
          method: 'post',

          maxBodyLength: Infinity,
          url: `${url}`, 
          headers: {
            Authorization: `Bearer ${storedUserData.token}` // Include the bearer token in the Authorization header
        },
          data: data,
        };
    
        const response = await axios.request(config);
      return response.data;
    } catch (error) {
        console.error('Error Login:', error);
        throw error;
      }
    }

export default AddUser