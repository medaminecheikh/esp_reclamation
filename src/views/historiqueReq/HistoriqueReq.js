import React from 'react';
import {Box, CssBaseline, Grid} from "@mui/material";
import AppAppBar from "../reclamation/components/topbar";
import GetIssueByField from "../../services/jiraAPI/requests/getIssueByfield";

function HistoriqueReq() {
    const { dataIssueByField, errorIssueByField } = GetIssueByField("mahmoudi.API@esprit.tn");
    return (
        <Box
            sx={{ display: 'flex', flexGrow: 1, width: '100%', height: '100vh', alignItems: 'center',marginTop: 10 }}>
            <CssBaseline />
            <Box sx={{ flexGrow: 1 }}>
                <AppAppBar />
                <Grid container spacing={3} >
                    <Grid item xs >

                    </Grid>
                    <Grid item xs={8} sm={7} sx={{ alignItems: 'center', padding: 2 }}>
                       <h1> HERE HISTORIQUE</h1>

                       {errorIssueByField && <p>Error: {errorIssueByField.message}</p>}
            {dataIssueByField && (
                <div>
                    {Array.isArray(dataIssueByField) ? (
                        // Render each item in the array
                        dataIssueByField.map(issue => (
                            <div key={issue.id}>
                                {/* Render issue details */}
                                <p>Issue ID: {issue.id}</p>
                                {/* Add more details as needed */}
                            </div>
                        ))
                    ) : (
                        // Render single issue
                        <div>
                            {/* Render issue details */}
                            <p>Issue ID: {dataIssueByField.id}</p>
                            {/* Add more details as needed */}
                        </div>
                    )}
                </div>
            )}
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

export default HistoriqueReq;
