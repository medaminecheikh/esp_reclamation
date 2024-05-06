import { Button, Chip, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

function DetailIssue({User}) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }
  return (
    <Grid container style={{flexGrow:1}} spacing={1}>
        <Grid item xs={12}  sx={{display:'flex' ,justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant='h5'> Sommaire : {User?.fields.summary}</Typography>
                    <Chip sx={{minWidth:'70px'}} label={User?.fields.status?.name}></Chip>
        </Grid>
        <Grid item xs={12}  sx={{display:'flex' ,justifyContent:'space-between', alignItems:'center'}}>
            <Typography variant='caption'> From : {User?.fields.customfield_10112} </Typography>
            <Typography variant='caption'> At : {formatDate(User?.fields.created)} </Typography>
        </Grid>
        <Grid item xs={12}  sx={{display:'flex' ,marginBottom:2,justifyContent:'space-between', alignItems:'center'}}>
        <Typography variant='h5'> Tags :   {User?.fields.labels.map((label, index) =>
    <Chip key={index} color='error' size='small' variant='outlined' label={label}></Chip>)}   </Typography>
        <Typography variant='h6'> <KeyboardDoubleArrowUpIcon fontSize="small" color='error'/> {User?.fields.priority.name}     </Typography>
        </Grid>
        <Grid item xs={12}  sx={{display:'flex' ,justifyContent:'flex-start', alignItems:'center'}}>
        <Typography variant='h5'> Description :  </Typography>
        
        </Grid>
        <Grid item xs={12}  sx={{display:'flex' ,justifyContent:'flex-start', alignItems:'center'}}>
       <MainCard style={{display:'flex', width:'100%',height:'200px',overflow:'auto'}}  sx={{border:1,borderColor:'#d2d6de'}}>
       <Typography variant='body2'> DetailIssue : </Typography>
       </MainCard>
        </Grid>
        <Grid item xs={12}  sx={{display:'flex' ,justifyContent:'flex-start', alignItems:'center'}}>
        <Typography variant='h5'> File :   <AttachFileIcon color={'primary'} fontSize='small'/></Typography>
        
        </Grid>
        <Grid item xs={12} marginTop={2} sx={{display:'flex' ,justifyContent:'flex-end', alignItems:'center'}}>
        <Stack direction="row"  spacing={2}>
      <Button size='small' color='inherit' variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <Button size='small' color='secondary' variant="contained" endIcon={<SendIcon />}>
        Complet
      </Button>
      </Stack>
    </Grid>
     
        </Grid>
  )
}

export default DetailIssue