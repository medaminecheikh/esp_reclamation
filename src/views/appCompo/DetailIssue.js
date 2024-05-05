import { Button, Chip, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
function DetailIssue({User}) {
  return (
    <Grid container style={{flexGrow:1}} spacing={1}>
        <Grid item xs={12}  sx={{display:'flex' ,justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant='h5'> Sommaire : {User?.issue}</Typography>
                    <Chip label='In Progress'></Chip>
        </Grid>
        <Grid item xs={12}  sx={{display:'flex' ,justifyContent:'space-between', alignItems:'center'}}>
            <Typography variant='caption'> From : </Typography>
            <Typography variant='caption'> At : </Typography>
        </Grid>
        <Grid item xs={12}  sx={{display:'flex' ,justifyContent:'flex-start', alignItems:'center'}}>
        <Typography variant='h5'> Tags :           <Chip size='small' variant='outlined'  label='bug'></Chip></Typography>
        
        </Grid>
        <Grid item xs={12}  sx={{display:'flex' ,justifyContent:'flex-start', alignItems:'center'}}>
        <Typography variant='h5'> Description :  </Typography>
        
        </Grid>
        <Grid item xs={12}  sx={{display:'flex' ,justifyContent:'flex-start', alignItems:'center'}}>
       <MainCard style={{display:'flex', width:'100%',maxHeight:'200px',overflow:'auto'}}  sx={{border:1,borderColor:'#d2d6de'}}>
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