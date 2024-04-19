import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import ReclamationForm from './components/ReclamationForm';
import AppAppBar from './components/topbar';



export default function Reclamation() {

  return (
    <Box 
      sx={{ display: 'flex', flexGrow: 1, width: '100%', height: '100vh', alignItems: 'center',justifyContent: 'center' }}
    
      >
      <CssBaseline /> 
      <Box sx={{ width: '100%', maxWidth: 680 }}> 
        <AppAppBar />
        <ReclamationForm /> 
      </Box>
    </Box>
  );
}
