import React, { useEffect, useState } from 'react';
// material-ui
import { Alert, Box, Grid, Snackbar } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useUser } from 'context/UserContext';
import UserGetAll from 'services/backApi/userApi/UserGetAll';
import DataTableUser from './compo/DataTableUser';

function ModifierCompte (){
  const { user } = useUser();
  const [ListUsers, setListUsers] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserGetAll(user);
        if (response.status === 200) {
          setListUsers(response); // Assuming response contains data field with user list
          console.log(response); // Logging the fetched data
        } else {
          setOpenSnackbar(true);
          setSnackbarMessage("Failed to fetch users. Please try again.");
          setSnackbarSeverity("error");
        }
      } catch (error) {
        setOpenSnackbar(true);
        setSnackbarMessage("Failed to fetch users. Please try again.");
        setSnackbarSeverity("error");
        console.error('Error fetching users:', error);
      }
    };
  
    fetchData(); // Call the async function to fetch data
  
  }, []);
  
    return (

      <MainCard title="Modifier Compte">

        <Box  sx={{  flexGrow: 1 }}> 
        <Grid justifyContent={'center'} alignContent={'space-around'} container>
        
        <Grid item xs={4}> fffff</Grid>

        <Grid item xs={7}> <DataTableUser Users={ListUsers}/></Grid>
        </Grid>  
         </Box>
      
       
        <Snackbar  open={openSnackbar} autoHideDuration={10000} onClose={handleCloseSnackbar}
 anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
     <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
       {snackbarMessage}
     </Alert>
   </Snackbar>
      </MainCard>
 
    );
 
}

export default ModifierCompte;
