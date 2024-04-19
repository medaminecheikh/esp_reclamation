import React, { useEffect, useState  } from 'react';
import {Box, CssBaseline, Grid } from "@mui/material";
import AppAppBar from "../reclamation/components/topbar";
import ListIssues from '../historiqueReq/historiqueComp/ListIssues'
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import GetIssueByField from "../../services/jiraAPI/requests/getIssueByfield";

function HistoriqueReq() {
    const { dataIssueByField, errorIssueByField } = GetIssueByField();
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

 // State to track the current page
    const [page, setPage] = useState(1);
    // Items per page
    const itemsPerPage = 5;

    // Function to handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
       // Function to calculate the number of pages
    const getPageCount = () => {
        if (!dataIssueByField) return 0; // Return 0 if dataIssueByField is null
        return Math.ceil(dataIssueByField.issues.length / itemsPerPage);
    };

   
    // Get items for the current page
    const currentPageItems = dataIssueByField?.issues ? dataIssueByField?.issues.slice((page - 1) * itemsPerPage, page * itemsPerPage) : [];

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
                        <Typography variant="h1" gutterBottom color="dark">
                            Liste des Réclamations
                        </Typography>
                       <Box sx={{width: '100%',
                            height: 'calc(100vh - 250px)',  overflow: 'auto'}}>

                                ssss
                            </Box>
                        <Box display="flex" justifyContent="center" >    
                        <Pagination
                count={getPageCount()}
                color="primary"
                onChange={handleChangePage}
            />
            </Box>
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
                        <ListIssues dataIssueByField={currentPageItems} errorIssueByField={errorIssueByField}/>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default HistoriqueReq;
