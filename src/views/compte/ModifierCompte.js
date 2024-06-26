import React, {useEffect, useState} from 'react';
// material-ui
import {Alert, Grid, Snackbar, Typography} from '@mui/material';

// project imports
import UserGetAll from 'services/backApi/userApi/UserGetAll';
import DataTableUser from './compo/DataTableUser';
import UpdateForm from './compo/UpdateForm';
import MainCard from 'ui-component/cards/MainCard';


function ModifierCompte() {

    const [ListUsers, setListUsers] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserIndex, setSelectedUserIndex] = useState(null);


    const handleUserSelect = (user, index) => {
        setSelectedUser(user);
        setSelectedUserIndex(index); // Save the index of the selected user

    };

    const handleFormReset = () => {
        setSelectedUser(null);
        setSelectedUserIndex(null); // Reset the selected index when the form is reset

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

            }
        };

        fetchData(); // Call the async function to fetch data

    }, [selectedUser]);

    return (

        <MainCard>


            <Grid justifyContent={'center'} alignItems={'flex-start'} container>
                <Typography variant='h2' mt={2} sx={{textDecorationColor: 'info'}}> Liste des Utilisateurs</Typography>

                <Grid item xs={12}> <DataTableUser Users={ListUsers} onSelect={handleUserSelect}
                                                   selectedRowIndex={selectedUserIndex}/></Grid>

                <Grid item xs={12}>

                    <UpdateForm initialUser={selectedUser} onFormReset={handleFormReset}/>
                </Grid>
                <Grid item xs={12}>


                </Grid>

            </Grid>
            <Snackbar open={openSnackbar} autoHideDuration={10000} onClose={handleCloseSnackbar}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{width: '100%'}}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>


        </MainCard>


    );

}

export default ModifierCompte;
