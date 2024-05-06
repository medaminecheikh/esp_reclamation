import { Button, Chip, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MainCard from 'ui-component/cards/MainCard'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';
import GetIssueById from 'services/jiraAPI/requests/GetIssueById';

const getStatusColor = (status) => {
  switch (status) {
      case "In Progress":
          return "primary";
      case "Done":
          return "success";
      default:
          return "secondary";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
      case "In Progress":
          return <HourglassEmptyIcon />;
      case "Done":
          return <DoneIcon />;
      default:
          return <ErrorIcon />;
  }
};

function DetailIssue({User}) {
          const [SelectedIssue, setSelectedIssue] = useState(null);
  const color = getStatusColor(User?.fields?.status?.name);
  const icon = getStatusIcon(User?.fields?.status?.name);
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  useEffect(() => {
    const fetchData = async () => {
      console.log('User:', User);
        try {
          if (User && User?.id) {
            const issuesResponse = await GetIssueById(User?.id);
            setSelectedIssue(issuesResponse);
          }else   {
            setSelectedIssue(null);
        }
          
            // Handle the response here, e.g., set state with the data
            console.log('SelectedIssue:', SelectedIssue);
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
}, [User]); 
  return (
    <Grid container style={{flexGrow:1}} spacing={1}>
        <Grid item xs={12}  sx={{display:'flex' ,justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant='h5'> Sommaire : {User?.fields?.summary}</Typography>
                    <Chip sx={{minWidth:'70px'}} label={User?.fields?.status?.name}
            color={color}
            icon={icon}></Chip>
        </Grid>
        <Grid item xs={12}  sx={{display:'flex' ,justifyContent:'space-between', alignItems:'center'}}>
            <Typography variant='caption'> From : {User?.fields.customfield_10112} </Typography>
            <Typography variant='caption'> At : {formatDate(User?.fields.created)} </Typography>
        </Grid>
        <Grid item xs={12}  sx={{display:'flex' ,marginBottom:2,justifyContent:'space-between', alignItems:'center'}}>
        <Typography variant='h5'> Tags :   {User?.fields?.labels.map((label, index) =>
    <Chip key={index} color='error' size='small' variant='outlined' label={label}></Chip>)}   </Typography>
        <Typography variant='h6'> <KeyboardDoubleArrowUpIcon fontSize="small" color='error'/> {User?.fields?.priority.name}     </Typography>
        </Grid>
        <Grid item xs={12}  sx={{display:'flex' ,justifyContent:'flex-start', alignItems:'center'}}>
        <Typography variant='h5'> Description :  </Typography>
        
        </Grid>
        <Grid item xs={12}  sx={{display:'flex' ,justifyContent:'flex-start', alignItems:'center'}}>
       <MainCard style={{display:'flex', width:'100%',height:'200px',overflow:'auto'}}  sx={{border:1,borderColor:'#d2d6de'}}>
       <Typography variant='body2'>{User?.fields?.description} </Typography>
       </MainCard>
        </Grid>
        <Grid item xs={12}  sx={{display:'flex' ,justifyContent:'flex-start', alignItems:'center'}}>
        <Typography variant='h5'> File :   <AttachFileIcon color={'primary'} fontSize='small'/></Typography>
        
        </Grid>
        <Grid item xs={12} marginTop={2} sx={{display:'flex' ,justifyContent:'flex-end', alignItems:'center'}}>
        <Stack direction="row"  spacing={2}>
      <Button disabled={!User} size='small' color='inherit' variant="outlined" startIcon={<DeleteIcon />}>
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