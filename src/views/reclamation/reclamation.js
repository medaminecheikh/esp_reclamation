import React from 'react';
import AppAppBar from './components/topbar';
import { Box, CssBaseline, Grid, Paper } from '@mui/material';
import ReclamationForm from './components/ReclamationForm';
import { styled } from '@mui/material/styles';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
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
    <div>
      <CssBaseline />

      <AppAppBar mode={mode} toggleColorMode={toggleColorMode}></AppAppBar>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Item></Item>
        </Grid>
        <Grid item xs={8}>
          <Item> <ReclamationForm /></Item>
        </Grid>
        <Grid item xs>
          <Item></Item>
        </Grid>
      </Grid>
      </Box>
    </div>
  );
}
