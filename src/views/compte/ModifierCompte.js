import React, { useEffect, useState } from 'react';
// material-ui
import { Alert, Snackbar, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useUser } from 'context/UserContext';
import UserGetAll from 'services/backApi/userApi/UserGetAll';

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
          setListUsers(response.data); // Assuming response contains data field with user list
          console.log(response.data); // Logging the fetched data
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
        <Typography variant="body2">
         {ListUsers}
          {user ? user.username : " user not found"}
          Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie
          magna alissa. Ut enif ad
          minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube
          grue dolor in reprehended
          in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in
          culpa qui officiate
          descent molls anim id est labours.
        </Typography>
        <Snackbar  open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}
 anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
     <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
       {snackbarMessage}
     </Alert>
   </Snackbar>
      </MainCard>
 
    );
 
}

export default ModifierCompte;
