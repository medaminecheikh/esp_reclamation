import { Button, Chip, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';
import DeleteIssue from 'services/jiraAPI/requests/DeleteIssue';
import  { getTransitions, transitionIssue } from 'services/jiraAPI/requests/UpdateIssue';

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
         
  const color = getStatusColor(User?.fields?.status?.name);
  const icon = getStatusIcon(User?.fields?.status?.name);
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }
const handleDelete= async ()=>{
  try{
 await DeleteIssue(User.id);
 window.location.reload();
  }catch(error){
    console.error(error)
  }
}
  const handleClickFile = () => {
    // Access the content and perform the desired action
    const content = User?.fields?.attachment[0]?.content;
    // Perform the action here, for example, opening the content in a new window
    if (content) {
        window.open(content, '_blank');
    }
};

const handleComplete = async () => {
  try {
      // First, fetch the available transitions for the issue
      const transitions = await getTransitions(User.id);
      // Find the transition ID for the "Done" status
      const doneTransition = transitions.find(transition => transition.name === "Done");
      if (doneTransition) {
          await transitionIssue(User.id, doneTransition.id);
          window.location.reload();
          console.log('Issue status updated to Done successfully.');
      } else {
          console.error('No available transition to Done status.');
      }
  } catch (error) {
      console.error('Error updating issue status:', error);
  }
};

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
        <Typography onClick={handleClickFile} style={{ cursor: 'pointer' }}  variant='body1'> File : {User?.fields?.attachment[0]?.filename}  <AttachFileIcon color={'primary'} fontSize='small'/></Typography>
        
        </Grid>
        <Grid item xs={12} marginTop={2} sx={{display:'flex' ,justifyContent:'flex-end', alignItems:'center'}}>
        <Stack direction="row"  spacing={2}>
      <Button disabled={!User} onClick={handleDelete} size='small' color='inherit' variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <Button disabled={!User}   onClick={handleComplete} size='small' color='secondary' variant="contained" endIcon={<SendIcon />}>
        Complet
      </Button>
      </Stack>
    </Grid>
     
        </Grid>
  )
}

export default DetailIssue