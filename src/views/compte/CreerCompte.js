import React, {useEffect, useState} from 'react';
// material-ui
import {Grid, Box, Button, FormControl, InputLabel, Select, MenuItem, TextField, Snackbar, Alert} from '@mui/material';
import * as Yup from 'yup';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import {useFormik} from 'formik';
import AddUser from 'services/backApi/userApi/AddUser';
import RoleGetAll from 'services/backApi/userApi/RoleGetAll';

const SignupSchema = Yup.object().shape({
    username: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required').min(8, 'Password is too short - should be 8 chars minimum.'),
    confirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
    enabled: Yup.string().required('Required'),
    role: Yup.object().shape({
        id: Yup.string().required('Required'), // Assuming id is a string
        name: Yup.string().required('Required')
    })
});

function CreerCompte() {

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [roles, setroles] = useState([])


    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    const formik = useFormik({
        initialValues: {
            id: '',
            username: '',
            password: '',
            confirm: '',
            enabled: true,
            role: {id: '', name: ''},
        },
        validationSchema: SignupSchema,
        onSubmit: async (values, {setSubmitting, resetForm}) => {
            try {
                console.log("add", values);
                await AddUser(values);
                setOpenSnackbar(true);
                setSnackbarMessage("User added successfully!");
                setSnackbarSeverity("success");
                resetForm();
            } catch (error) {
                setOpenSnackbar(true);
                setSnackbarMessage("Failed to add user. Please try again.");
                setSnackbarSeverity("error");
                console.error('Error adding user:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });


    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await RoleGetAll();

                if (response) {
                    setroles(response); // Assuming response contains data field with user list

                } else {
                    console.error('Error fetching roles:', response);
                    setOpenSnackbar(true);
                    setSnackbarMessage("Failed to fetch roles. Please try again.");
                    setSnackbarSeverity("error");
                }


            } catch (error) {
                setOpenSnackbar(true);
                setSnackbarMessage("Failed to fetch roles. Please try again.");
                setSnackbarSeverity("error");
                console.error('Error fetching roles:', error);
            }
        };

        fetchData(); // Call the async function to fetch data

    }, []);

    return (
        <MainCard title="Nouveau Compte">


            <form onSubmit={formik.handleSubmit}>
                <Box sx={{flexGrow: 1}}>

                    <Grid container spacing={3} marginTop={1}
                          sx={{alignItems: 'center', justifyContent: 'space-evenly'}}>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl fullWidth>
                                <TextField
                                    {...formik.getFieldProps('username')}
                                    name="username"
                                    type="email"
                                    label="Email"
                                    variant='outlined'
                                    error={formik.touched.username && Boolean(formik.errors.username)}

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                                <InputLabel id="enable-label">Status</InputLabel>
                                <Select
                                    {...formik.getFieldProps('enabled')}

                                    name="enabled"
                                    labelId="enable-label"
                                    id="enable-simple-select"
                                    label="Enabled"
                                    error={formik.touched.enabled && Boolean(formik.errors.enabled)}

                                >
                                    <MenuItem value={true}>Activer</MenuItem>
                                    <MenuItem value={false}>Désactiver</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                <Select

                                    value={formik.values.role.id}
                                    onChange={(event) => {
                                        // When a new role is selected, update the formik values with the selected role object
                                        const selectedRoleId = event.target.value;
                                        const selectedRole = roles.find((role) => role.id === selectedRoleId);
                                        formik.setFieldValue('role', selectedRole);
                                    }}
                                    name="role"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Role"
                                    error={formik.touched.role && Boolean(formik.errors.role)}
                                >
                                    {roles.map((role) => (
                                        <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} marginTop={1}>
                            <FormControl fullWidth>
                                <TextField
                                    {...formik.getFieldProps('password')}
                                    name="password"
                                    type="password"
                                    label="Password"
                                    variant='outlined'
                                    error={formik.touched.password && Boolean(formik.errors.password)}

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} marginTop={1}>
                            <FormControl fullWidth>
                                <TextField
                                    {...formik.getFieldProps('confirm')}
                                    name="confirm"
                                    type="password"
                                    label="Confirme Password"
                                    variant='outlined'
                                    error={formik.touched.confirm && Boolean(formik.errors.confirm)}

                                />
                            </FormControl>
                        </Grid>
                    </Grid>


                    <Grid container spacing={3} marginTop={4} direction="row" justifyContent="center"
                          alignItems="center">
                        <Grid item xs={4}>
                            <AnimateButton>
                                <Button disabled={formik.isSubmitting} disableElevation fullWidth size="small"
                                        type="submit" variant="contained" color='secondary'>
                                    Save
                                </Button>
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={2}>
                            <AnimateButton>
                                <Button disabled={formik.isSubmitting} disableElevation fullWidth size="small"
                                        type="reset" variant="contained" color="inherit">
                                    Cancel
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </Box>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}
                          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{width: '100%'}}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </form>

        </MainCard>
    );

}

export default CreerCompte;
