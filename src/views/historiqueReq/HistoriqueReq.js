import React, { useEffect } from 'react';
import {Box, CssBaseline, Grid} from "@mui/material";
import AppAppBar from "../reclamation/components/topbar";
import ListIssues from '../historiqueReq/historiqueComp/ListIssues'


function HistoriqueReq() {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


    return (
        
        <Box 
            sx={{ display: 'flex', flexGrow: 1, width: '100%', height: '100vh', alignItems: 'center',marginTop: 2 }}>
            <CssBaseline />
          
            <Box  sx={{ flexGrow: 1 }}>
                <AppAppBar />
            
                <Grid container spacing={3} >
                    <Grid item xs={2}  >

                    </Grid>
                    <Grid item xs={6}  sx={{ alignItems: 'center', padding: 2 }}>
                      <Box sx={{display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
     
                

                       <ListIssues/>
                     </Box>
                    </Grid>
                    <Grid item xs={3}  sx={{ alignItems: 'center' }} >
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}  >

                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default HistoriqueReq;
