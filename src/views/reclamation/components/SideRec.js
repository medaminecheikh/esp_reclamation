import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

function SideRec() {
  return (
    <Box sx={{ display: 'flex', flexGrow: 1,
      flexDirection: 'column',
      alignItems: 'center'}}>
      <Grid item xs={12} sm={6} >
        <Button startIcon={<ArrowBack />} size="large">Back to Home Page</Button>
      </Grid>

    </Box>
  );
}

export default SideRec;
