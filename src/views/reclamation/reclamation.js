import React from 'react';
import AppAppBar from './components/topbar';
import { Box, CssBaseline, Grid, Paper } from '@mui/material';
import ReclamationForm from './components/ReclamationForm';
import { styled } from '@mui/material/styles';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#F5F5F5',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
export default function Reclamation() {
  const [mode, setMode] = React.useState('light');
  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };
  return (
    <Box sx={{display: 'flex', flexGrow: 1, bgcolor: '#F5F5F5', width: '100%', height: '100vh', alignItems: 'center'}} >
    <CssBaseline />
    <AppAppBar mode={mode} toggleColorMode={toggleColorMode}></AppAppBar>
    <Box sx={{ flexGrow: 1, bgcolor: '#F5F5F5' }} >
      <Grid container spacing={3} sx={{ bgcolor: '#F5F5F5' }}>
        <Grid item xs sx={{alignItems:'center', bgcolor: '#F5F5F5'}}>
          <Item></Item>
        </Grid>
        <Grid item xs={8} sm={7} sx={{alignItems:'center', bgcolor: '#F5F5F5'}}>
          <Item> <ReclamationForm /></Item>
        </Grid>
        <Grid item xs sx={{alignItems:'center', bgcolor: '#F5F5F5'}}>
          <Item></Item>
        </Grid>
      </Grid>
    </Box>
  </Box>
  );
}
