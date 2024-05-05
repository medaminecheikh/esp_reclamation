import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

function ListIssuesAdmin() {
  return (
    <Grid container style={{flexGrow:1}} spacing={2}>
         <Grid item xs={12}  sx={{display:'flex' ,justifyContent:'center', alignItems:'flex-start'}}>
                    <Typography variant='h4'> Liste des Réclamations </Typography>
          </Grid>
          <Grid item xs={12}>
    <TableContainer component={Paper} style={{ maxHeight: 400,minHeight:'400px' }} >
      <Table stickyHeader  size="small" aria-label="simple table">
        <TableHead>
       
          <TableRow > 
            <TableCell>Email</TableCell>
          
            <TableCell align="center">Status</TableCell>
            <TableCell align="right">Date </TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody  style={{overflow:'auto'}} > </TableBody>
        </Table>
    </TableContainer>
    </Grid>
  </Grid>
  )
}

export default ListIssuesAdmin