import React, { useEffect } from 'react';
import {Box, CssBaseline, Grid } from "@mui/material";
import AppAppBar from "../reclamation/components/topbar";
import ListIssues from '../historiqueReq/historiqueComp/ListIssues'
import Typography from '@mui/material/Typography';

function HistoriqueReq() {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


    return (
        
     <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
            }}
        >
            <CssBaseline />
            <AppAppBar />
            <Grid container spacing={3} justifyContent="center" alignItems="flex-start">
                <Grid item xs={6} md={4} sx={{ maxWidth: 200,   marginTop: '90px', }}>
                    <Box sx={{ padding: 2 }}>
                        <Typography variant="h1" gutterBottom>
                            Liste des Réclamations
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: 700,
                            marginTop: '110px',
                            maxHeight: 'calc(100vh - 140px)',
                            overflow: 'auto',
                            padding: 2
                        }}
                    >
                        <ListIssues />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default HistoriqueReq;
