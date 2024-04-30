import React, { useEffect, useState } from 'react';
// material-ui
import { Alert, Box, Grid, Snackbar } from '@mui/material';

// project imports
import { useUser } from 'context/UserContext';
import UserGetAll from 'services/backApi/userApi/UserGetAll';
import DataTableUser from './compo/DataTableUser';
import UpdateForm from './compo/UpdateForm';


function ModifierCompte (props){
  const { user } = useUser();
  const [ListUsers, setListUsers] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [selectedUser, setSelectedUser] = useState(null);
      console.log("props {} and {}",props ,user);
  const handleUserSelect = (userS) => {
    console.log( "userS", userS )

    setSelectedUser(userS);

    console.log(selectedUser);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        
       
          const response = await UserGetAll();
          if (response) {
            setListUsers(response); // Assuming response contains data field with user list
             // Logging the fetched data
          } else {
            console.error('Error fetching users:', response);
            setOpenSnackbar(true);
            setSnackbarMessage("Failed to fetch users. Please try again.");
            setSnackbarSeverity("error");
          }
        
      
      } catch (error) {
        setOpenSnackbar(true);
        setSnackbarMessage("Failed to fetch users. Please try again.");
        setSnackbarSeverity("error");
        console.error('Error fetching users:', error);
        console.error('Error fetching users:', response);
      }
    };
  
    fetchData(); // Call the async function to fetch data
  
  }, []);
  
    return (

     

        <Box  boxShadow={2} padding={3} sx={{  flexGrow: 1,  bgcolor:'white' }}> 
        <Grid justifyContent={'space-between'} alignItems={'flex-start'} container>
        
  
        <Grid item xs={4} sx={{
         marginTop:'20px'
           
        }}  >

            <UpdateForm  user={user}/>
       </Grid>
        
        <Grid item xs={6}> <DataTableUser Users={ListUsers} onSelect={handleUserSelect}/></Grid>
        </Grid>  
        <Snackbar  open={openSnackbar} autoHideDuration={10000} onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
     <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
       {snackbarMessage}
     </Alert>
   </Snackbar>
        </Box>
      
       
     
    
 
    );
 
}

export default ModifierCompte;
