import React from 'react';
import { Box, CssBaseline, Grid } from '@mui/material';
import ReclamationForm from './components/ReclamationForm';
import AppAppBar from './components/topbar';



export default function Reclamation() {

  return (
    <Box
      sx={{ display: 'flex', flexGrow: 1, width: '100%', height: '100vh', alignItems: 'center' }}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppAppBar />
        <Grid container spacing={3} >
          <Grid item xs >
         
          </Grid>
          <Grid item xs={8} sm={7} sx={{ alignItems: 'center', padding: 2 }}>
            <ReclamationForm />
          </Grid>
          <Grid item xs sx={{ alignItems: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
