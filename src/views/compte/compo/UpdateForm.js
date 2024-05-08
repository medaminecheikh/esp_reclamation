import DoneIcon from '@mui/icons-material/Done';
import { Button, FormControl, Grid, Stack, InputLabel, MenuItem, Select, TextField, Typography, Divider, Alert, Snackbar } from '@mui/material'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Key, PersonPinCircleOutlined } from '@mui/icons-material';
import React, { useState, useEffect } from 'react'
import AnimateButton from 'ui-component/extended/AnimateButton'
import UpdateUser from 'services/backApi/userApi/UpdateUser';
import { Box } from '@mui/system';
import DeleteUser from './DeleteUser';

function UpdateForm({initialUser, onFormReset  }) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const validationSchema =  Yup.object().shape({
    password: Yup.string().nullable(),
    confirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').nullable(),
  
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
    try {
      if (initialUser) {
        formik.setValues({
          id: initialUser.id || '',
          username: initialUser.username || '',
          password: '',
          confirm:'',
          role: initialUser.role || { id: '', name: '' }, 
           enabled: initialUser.enabled?.toString() || '',
        });
      }
    } catch (error) {
      console.error(error);
    }
    
  }, [initialUser]);
  
  
  const formik = useFormik({
    initialValues: {
      id: '',
      username: '',
      confirm:'',
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
     
      onFormReset(); 
     
     
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
              <Typography variant="h3">Information du Compte </Typography>
              <DeleteUser deleteUser={initialUser}/>
             
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
             <Tab icon={<PersonPinCircleOutlined />} sx={{paddingRight:6}} iconPosition="start" label="Detail Compte" value="1" />
            <Tab icon={<Key />} sx={{paddingRight:6}} iconPosition="start" label="Password" value="2" />
        
      </TabList>
      <TabPanel value="1">
        
           {/* Email and Password fields */}
           <Stack direction="row" width={'100%'} style={{marginLeft:'50px'}} justifyContent={'space-evenly'} display={'flex'} spacing={3}>
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
      <TabPanel value="2" sx={{justifyContent:'space-around', display:'flex', flexGrow:1,maxWidth:'60%'}}>
        <Grid item xs={12} sx={{justifyContent:'space-around', display:'flex', maxWidth:'60%'}}>
      <TextField
                label="New Password"
                id="password"
                variant="filled"
                type="password"
                size="small"
                {...formik.getFieldProps('password')}
                error={formik.touched.password && Boolean(formik.errors.password)}
              />
              <TextField
                label="Confirme"
                id="confirm"
                variant="filled"
                type="password"
                size="small"
                {...formik.getFieldProps('confirm')}
                error={formik.touched.confirm && Boolean(formik.errors.confirm)}
              />
</Grid>
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