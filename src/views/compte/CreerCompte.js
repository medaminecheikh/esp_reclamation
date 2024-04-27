import React, { Component } from 'react';
// material-ui
import { Grid, Typography, Box, Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
class CreerCompte extends Component {



  render() {
    return (
      <MainCard title="Créer Compte">

    <Box component="form" noValidate  sx={{display:'flex'}}>
        <Grid container spacing={3} xs={8}
          sx={{  alignItems: 'center',
          justifyContent: 'space-evenly' }}> 
          <Grid item xs={4}  >
           <FormControl fullWidth>

           <TextField
              name="username"
              required
              fullWidth
              id="username"
              label="Email"
               />
           </FormControl>
          </Grid>
          <Grid item xs={3}  >
          <FormControl fullWidth>
        <InputLabel id="enable-label">Status</InputLabel>
        <Select
          labelId="enable-label"
          id="enable-simple-select"
          label="Enabled"
          
        >
          <MenuItem value="true">Activer</MenuItem>
          <MenuItem value="false">Désactiver</MenuItem>
        
        </Select>
      </FormControl>
          </Grid>
          <Grid item xs={3}  >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        
          label="Role"
          
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          
        </Select>
      </FormControl>
          </Grid>

          <Grid item xs={4}  >
          sssssssssssss
          </Grid>
          <Grid item xs={4}  >
          sssssssssssss
          </Grid>
        </Grid>

          <Grid container xs={1}> </Grid>
        
          <Grid container  xs={4} spacing={3} minHeight={"200px"} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={6}>  
              <AnimateButton>
                <Button disableElevation  fullWidth size="small" type="submit" variant="contained" color='secondary'>
                  Save 
                </Button>
              </AnimateButton>
            </Grid>  
            <Grid  item xs={6}  > 
            <AnimateButton>
                <Button disableElevation fullWidth  size="small" type="button" variant="contained" color="inherit">
                  Cancel
                </Button>
              </AnimateButton>
          </Grid>
       </Grid>
    </Box>
      
        <Typography variant="body2">
          Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
          minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in reprehended
          in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui officiate
          descent molls anim id est labours.
        </Typography>
      </MainCard>
    );
  }
}

export default CreerCompte;
