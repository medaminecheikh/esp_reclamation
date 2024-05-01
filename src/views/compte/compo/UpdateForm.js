import DoneIcon from '@mui/icons-material/Done';
import { Button, FormControl, Grid, Stack, InputLabel, MenuItem, Select, TextField, Typography, IconButton, Divider, Alert, Snackbar } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Key, PersonPinCircleOutlined } from '@mui/icons-material';
import React, { useState, useEffect } from 'react'
import AnimateButton from 'ui-component/extended/AnimateButton'
import UpdateUser from 'services/backApi/userApi/UpdateUser';
import { Box } from '@mui/system';

function UpdateForm({initialUser, onFormReset  }) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const validationSchema = Yup.object({
    username: Yup.string().notRequired(),
    password: Yup.string().notRequired(),
   
    enabled: Yup.string().notRequired(),
  });
  const handleCancel = () => {
    formik.resetForm();
    onFormReset(); 
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };


  useEffect(() => {
    console.log('useEffect called');
    if (initialUser) {
      formik.setValues({
        id: initialUser.id || '',
        username: initialUser.username || '',
        password: '',
        role: initialUser.role|| '',
        enabled: initialUser.enabled?.toString() || '',
      });
    }
  }, [initialUser]);
  
  
  const formik = useFormik({
    initialValues: {
      id: '',
      username: '',
      password: '',
      role: {id:'',name:''},
      enabled: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
     try{
      console.log(values);
     await UpdateUser(values);
     setOpenSnackbar(true);
      setSnackbarMessage("User Updated successfully!");
      setSnackbarSeverity("success");
      resetForm();
     
      
     
     
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
              <Typography variant="h3">Information du Compte {initialUser?.username}</Typography>
              <IconButton aria-label="delete" size="meduim" color="error">
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Stack>
            <Divider style={{ marginTop: '10px' }} />

     <Box sx={{ display: 'flex', height: 180 }}> {/* Adjust height as needed */}
        <TabContext value={value}
         orientation="vertical"
         onChange={handleChange}
         aria-label="Vertical tabs example"
         sx={{ borderRight: 1, borderColor: 'divider' }}>
      <TabList
        orientation="vertical"
      
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider'}}
      >
             <Tab icon={<PersonPinCircleOutlined />} iconPosition="start" label="Detail Compte" value="1" />
            <Tab icon={<Key />} iconPosition="start" label="Credential" value="2" />
        
      </TabList>
      <TabPanel value="1" >
        
           {/* Email and Password fields */}
           <Stack direction="row" maxWidth={'100%'} justifyContent={'space-evenly'} display={'flex'} spacing={2}>
              <TextField
                label="Email"
                id="username"
                variant="filled"
                size="small"
                {...formik.getFieldProps('username')}
               
              />
            

              <FormControl variant="filled" sx={{ minWidth: 150 }}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  size="small"
                  {...formik.getFieldProps('role.id')}
                
                >
                  <MenuItem value={53}>User</MenuItem>
                  <MenuItem value={52}>Admin</MenuItem>
      
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
                  <MenuItem value={true}>Activer</MenuItem>
                  <MenuItem value={false}>Désactiver</MenuItem>
             
                </Select>
              </FormControl>
            </Stack>
      </TabPanel>
      <TabPanel value="2">
      <TextField
                label="New Password"
                id="password"
                variant="filled"
                size="small"
                {...formik.getFieldProps('password')}
            
              />

      </TabPanel>

      </TabContext>
    </Box>
         

         

            {/* Save and Cancel buttons */}
            <Stack direction="row" style={{ marginTop: '60px', width: '100%' }} justifyContent="flex-end" spacing={2}>
              <Grid item xs={4}>
              <AnimateButton>
                <Button
                  endIcon={<DoneIcon /> }
                  disableElevation
                  fullWidth
                  disabled={formik.isSubmitting} 
                  size="small"
                  type="submit"
                  variant="contained"
                  sx={{ bgcolor: '#32a54e' }}
                >
                  Valider Modification
                </Button>
              </AnimateButton>
              </Grid>
              <Grid item xs={2}>
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
              </Grid>
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