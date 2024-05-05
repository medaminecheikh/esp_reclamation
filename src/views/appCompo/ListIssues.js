import { Button, Chip, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';

const ListIssues=[
  { id: 1, issue: 'Lorem ipsum dolor sit amet', tag: 'Tag 1', status: 'Pending' },
  { id: 2, issue: 'Consectetur adipiscing elit', tag: 'Tag 2', status: 'In Progress' },
  { id: 3, issue: 'Sed do eiusmod tempor incididunt', tag: 'Tag 3', status: 'Resolved' },
  { id: 4, issue: 'Ut labore et dolore magna aliqua', tag: 'Tag 4', status: 'Pending' },
  { id: 5, issue: 'Duis aute irure dolor in reprehenderit', tag: 'Tag 5', status: 'Resolved' },
  { id: 6, issue: 'Excepteur sint occaecat cupidatat non proident', tag: 'Tag 6', status: 'In Progress' },
  { id: 7, issue: 'Sunt in culpa qui officia deserunt mollit anim id est laborum', tag: 'Tag 7', status: 'Pending' },
  { id: 8, issue: 'Lorem ipsum dolor sit amet', tag: 'Tag 8', status: 'Resolved' },
  { id: 9, issue: 'Consectetur adipiscing elit', tag: 'Tag 9', status: 'In Progress' },
  { id: 10, issue: 'Sed do eiusmod tempor incididunt', tag: 'Tag 10', status: 'Resolved' },
];
function ListIssuesAdmin({onSelect}) {
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  
  const handleUserSelect = (user, index) => {
    onSelect(user);
    setSelectedRowIndex(index);
  };
  const handleUserUnSelect = () => {
    onSelect(null);
    setSelectedRowIndex(null);
  };

  return (
    <Grid container style={{flexGrow:1}} spacing={2}>
         <Grid item xs={12}  sx={{display:'flex' ,justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant='h4'> Liste des Réclamations </Typography>
                    <Button size='small' disabled={!selectedRowIndex} onClick={handleUserUnSelect} variant="text">UnSelect</Button>
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
        {ListIssues.map((row,index) => (
                <TableRow 
                style={{ cursor: 'pointer', backgroundColor: selectedRowIndex  === index ? '#cbe6ef' : 'transparent' }} // Change background color of selected row

                onDoubleClick={() => handleUserSelect(row, index)}
                key={index}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th">{row.issue}</TableCell>
                  <TableCell align="right">
                  <Chip variant='filled' size='small' label={row.status}></Chip>
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