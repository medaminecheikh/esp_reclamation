import { Button, Chip, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react';
import GetAllIssues from 'services/jiraAPI/requests/GetAllIssues';
import GetIssueById from 'services/jiraAPI/requests/GetIssueById';


function ListIssuesAdmin({onSelect}) {
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [AllIssues, setAllIssues] = useState([])
  const handleUserSelect = async (user, index) => {
    setSelectedRowIndex(index);
    try {
      if (user && user.id) {
        const issuesResponse = await GetIssueById(user.id);
        onSelect(issuesResponse.data);
        console.log('issuesResponse.data:', issuesResponse.data);
     }          
        // Handle the response here, e.g., set state with the data
     
    } catch (error) {
        // Handle errors here, e.g., set state with error message
        console.error('Error fetching JIRA issues:', error);
    }
  };
  const handleUserUnSelect = () => {
    onSelect(null);
    setSelectedRowIndex(null);
  };
  useEffect(() => {
    const fetchData = async () => {
        try {
            const issuesResponse = await GetAllIssues();
            setAllIssues(issuesResponse.data.issues);
            // Handle the response here, e.g., set state with the data
            console.log('Issues all:', AllIssues);
        } catch (error) {
            // Handle errors here, e.g., set state with error message
            console.error('Error fetching JIRA issues:', error);
        }
    };

    fetchData();

    // Cleanup function (optional) if needed
    return () => {
        // Perform cleanup tasks if necessary
    };
}, []); // Empty dependency array to run only once on component mount

  return (
    <Grid container style={{flexGrow:1}} spacing={2}>
         <Grid item xs={12}  sx={{display:'flex' ,justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant='h4'> Liste des Réclamations </Typography>
                    <Button size='small' disabled={selectedRowIndex===null} onClick={handleUserUnSelect} variant="text">UnSelect</Button>
          </Grid>
          <Grid item xs={12}>
    <TableContainer component={Paper} style={{ maxHeight: 400,minHeight:'400px' }} >
      <Table stickyHeader  size="small" aria-label="simple table">
        <TableHead>
       
          <TableRow > 
            <TableCell align="center">Sommaire du Problème</TableCell>
          
           
            <TableCell align="center"> Status </TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody  style={{overflow:'auto'}} > 
        {AllIssues?.map((row,index) => (
                <TableRow 
                style={{ cursor: 'pointer', backgroundColor: selectedRowIndex  === index ? '#cbe6ef' : 'transparent' }} // Change background color of selected row

                onDoubleClick={() => handleUserSelect(row, index)}
                key={index}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th">{row?.fields.summary}</TableCell>
                  <TableCell align="right">
                  <Chip variant='filled' size='small' label={row?.fields.status?.name}></Chip>
                    </TableCell>
                </TableRow>
              ))}
        </TableBody>
        </Table>
    </TableContainer>
    </Grid>
  </Grid>
  )
}

export default ListIssuesAdmin