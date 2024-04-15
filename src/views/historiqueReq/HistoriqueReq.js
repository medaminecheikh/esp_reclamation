import React from 'react';
import {Box, CssBaseline, Grid} from "@mui/material";
import AppAppBar from "../reclamation/components/topbar";
import ListIssues from '../historiqueReq/historiqueComp/ListIssues'

function HistoriqueReq() {
    
    return (
        <Box
            sx={{ display: 'flex', flexGrow: 1, width: '100%', height: '100vh', alignItems: 'center',marginTop: 10 }}>
            <CssBaseline />
            <Box sx={{ flexGrow: 1 }}>
                <AppAppBar />
                <Grid container spacing={3} >
                    <Grid item xs={1} >

                    </Grid>
                    <Grid item xs={5}  sx={{ alignItems: 'center', padding: 2 }}>
                      <Box sx={{marginTop: 10,display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
     
                       <h1> HERE HISTORIQUE</h1>

                       <ListIssues/>
                     </Box>
                    </Grid>
                    <Grid item xs={3}  sx={{ alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default HistoriqueReq;
