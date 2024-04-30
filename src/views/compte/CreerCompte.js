import React, {  useState } from 'react';
// material-ui
import { Grid, Box, Button, FormControl, InputLabel, Select, MenuItem, TextField,Snackbar, Alert } from '@mui/material';
import * as Yup from 'yup';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Field, Form, Formik } from 'formik';
import AddUser from 'services/backApi/userApi/AddUser';
import {useUser} from '../../context/UserContext';

const SignupSchema = Yup.object().shape({
  username: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required').min(8, 'Password is too short - should be 8 chars minimum.'),
  confirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
  enabled: Yup.string().required('Required'),
  role: Yup.string().required('Required')
});

function CreerCompte (){

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const { user } = useUser();
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await AddUser(values, user);
      if (response.status === 200) {
        setOpenSnackbar(true);
        setSnackbarMessage("User added successfully!");
        setSnackbarSeverity("success");
        resetForm();
      }
    } catch (error) {
      setOpenSnackbar(true);
      setSnackbarMessage("Failed to add user. Please try again.");
      setSnackbarSeverity("error");
      console.error('Error adding user:', error);
    } finally {
      setSubmitting(false);
    }
  };

const handleCloseSnackbar = () => {
  setOpenSnackbar(false);
};

  
    return (
      <MainCard title="Nouveau Compte">
      <Formik
        initialValues={{
          username: '',
          password: '',
          confirm: '',
          enabled: 'true',
          role: 'user'
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Box sx={{  flexGrow: 1 }}>
              <Grid container spacing={3} marginTop={1} sx={{ alignItems: 'center', justifyContent: 'space-evenly' }}>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <Field as={TextField}
                      name="username"
                      type="email"
                      label="Email"
                      variant='outlined'
                      error={touched.username && Boolean(errors.username)}
                    
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel id="enable-label">Status</InputLabel>
                    <Field
                      as={Select}
                      name="enabled"
                      labelId="enable-label"
                      id="enable-simple-select"
                      label="Enabled"
                      error={touched.enabled && Boolean(errors.enabled)}
                      
                    >
                      <MenuItem value="true">Activer</MenuItem>
                      <MenuItem value="false">Désactiver</MenuItem>
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Field
                      as={Select}
                      name="role"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Role"
                    >
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} marginTop={1}>
                  <FormControl fullWidth>
                    <Field as={TextField}
                      name="password"
                      type="password"
                      label="Password"
                      variant='outlined'
                      error={touched.password && Boolean(errors.password)}
                     
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} marginTop={1}>
                  <FormControl fullWidth>
                    <Field as={TextField}
                      name="confirm"
                      type="password"
                      label="Confirme Password"
                      variant='outlined'
                      error={touched.confirm && Boolean(errors.confirm)}
                     
                    />
                  </FormControl>
                </Grid>
              </Grid>

              

              <Grid container spacing={3} marginTop={4} direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={4}>
                  <AnimateButton>
                    <Button disabled={isSubmitting}   disableElevation fullWidth size="small" type="submit" variant="contained" color='secondary'>
                      Save
                    </Button>
                  </AnimateButton>
                </Grid>
                <Grid item xs={2}>
                  <AnimateButton>
                    <Button disabled={isSubmitting}  disableElevation fullWidth size="small" type="reset" variant="contained" color="inherit">
                      Cancel
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </Box>
            <Snackbar  open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                  {snackbarMessage}
                </Alert>
              </Snackbar>
          </Form>
        )}
      </Formik>
      </MainCard>
    );
  
}

export default CreerCompte;
