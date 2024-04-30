import DoneIcon from '@mui/icons-material/Done';
import { Button, FormControl, Grid, Stack, InputLabel, MenuItem, Select, TextField, Typography, IconButton, Divider, Alert, Snackbar } from '@mui/material'
import { green } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import React, { useState } from 'react'
import AnimateButton from 'ui-component/extended/AnimateButton'
import UpdateUser from 'services/backApi/userApi/UpdateUser';

function UpdateForm({user}) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");


  const validationSchema = Yup.object({
    username: Yup.string().notRequired(),
    password: Yup.string().notRequired(),
    role: Yup.string().notRequired(),
    enabled: Yup.string().notRequired(),
  });
  const handleCancel = () => {
    formik.resetForm();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  
  const formik = useFormik({
    initialValues: {
      id: '',
      username: '',
      password: '',
      role: '',
      enabled: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
     try{
      console.log(values);
      const response = await UpdateUser(values, user);
      if (response.status === 200) {
        setOpenSnackbar(true);
        setSnackbarMessage("User Updated successfully!");
        setSnackbarSeverity("success");
        resetForm();
      }
    } catch (error) {
      setOpenSnackbar(true);
      setSnackbarMessage("Failed to Updated user. Please try again.");
      setSnackbarSeverity("error");
      console.error('Error Updated user:', error);
      }finally {
        setSubmitting(false);
      }
      // Implement your form submission logic here
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Stack spacing={4}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h2">Utilisateur Choisi</Typography>
              <IconButton aria-label="delete" size="meduim" color="error">
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Stack>
            <Divider style={{ marginTop: '10px' }} />
            {/* Email and Password fields */}
            <Stack direction="row" spacing={2}>
              <TextField
                label="Email"
                id="username"
                variant="filled"
                size="small"
                {...formik.getFieldProps('username')}
               
              />
              <TextField
                label="New Password"
                id="password"
                variant="filled"
                size="small"
                {...formik.getFieldProps('password')}
            
              />
            </Stack>

            {/* Role and enabled selects */}
            <Stack direction="row" spacing={2} justifyContent="space-evenly">
              <FormControl variant="filled" sx={{ minWidth: 150 }}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  size="small"
                  {...formik.getFieldProps('role')}
                
                >
                  <MenuItem value={"user"}>User</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
      
                </Select>
              </FormControl>

              <FormControl variant="filled" sx={{ minWidth: 150 }}>
                <InputLabel id="enabled-label">Status</InputLabel>
                <Select
                  labelId="enabled-label"
                  id="enabled"
                  size="small"
                  {...formik.getFieldProps('enabled')}
                  
                >
                  <MenuItem value={"true"}>Activer</MenuItem>
                  <MenuItem value={"false"}>Desactiver</MenuItem>
             
                </Select>
              </FormControl>
            </Stack>

            {/* Save and Cancel buttons */}
            <Stack direction="row" style={{ marginTop: '60px', width: '100%' }} justifyContent="flex-end" spacing={2}>
              <Grid item xs={5}>
              <AnimateButton>
                <Button
                  endIcon={<DoneIcon /> }
                  disableElevation
                  fullWidth
                  disabled={formik.isSubmitting} 
                  size="small"
                  type="submit"
                  variant="contained"
                  sx={{ bgcolor: green[700] }}
                >
                  Save
                </Button>
              </AnimateButton>
              </Grid>
              <AnimateButton>
                <Button
                  disableElevation
                  fullWidth
                  size="small"
                  type="reset"
                  variant="contained"
                  color="inherit"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </AnimateButton>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <Snackbar  open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                  {snackbarMessage}
                </Alert>
              </Snackbar>
    </form>
  );
}
export default UpdateForm