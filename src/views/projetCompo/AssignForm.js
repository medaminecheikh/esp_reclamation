import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'
import getAssignableUsers from 'services/jiraAPI/requests/getAssignableUsersToIssue';
import AnimateButton from 'ui-component/extended/AnimateButton';

 function AssignForm(props) {
    const [issue, setIssue] = useState('');
    const [userSel, setUserSel] = useState('');
    const [users, setUsers] = useState([]);


     const handleCancel = ()=>{
      setUserSel('');
      setUsers([]);
      setIssue('');
     
     }
    const handleChangeUser = (event) => {
      setUserSel(event.target.value);
   
  };

  const handleChangeIssues = (event) => {
    setIssue(event.target.value);
 
};
    const {project, issues,cancled } = props;
    console.warn(issues);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const projectKey = project?.key;
          const issueKey = issue;
          if(projectKey && issueKey){
            const response = await getAssignableUsers({projectKey, issueKey});
          setUsers(response);
          }else{handleCancel();
            console.info("cancled called in fetchData", cancled);}
         
          console.info("fetchData called ", fetchData); 
        } catch (error) {
          console.error('Error fetching assignable users:', error);
          // Handle error if needed
        }
      };
    
      fetchData();
    }, [project, issue]);
    useEffect(() => {
      if(cancled === true){
        handleCancel();
        
      }
      console.info("cancled called ", cancled);
    }, [cancled]);
    
    return (
      <Grid container width={'95%'} sx={{justifyContent:'space-between', alignItems:'center'}}>
     
    
      <Grid item xs={7} display={'flex'} justifyContent={'space-evenly'}>
      <FormControl sx={{minWidth: 150}} size="small">
      <InputLabel id="enabled-label">Select Issue</InputLabel>
      <Select
    labelId="enabled-label"
    id="issue"
    label="Select Issue"
    value={issue}
    onChange={handleChangeIssues}
    variant='standard'
    >
      {issues ? issues.map((issue,index) => (
         <MenuItem key={index} value={issue.key}>{issue?.fields?.labels[0]}</MenuItem>
      ))  : <MenuItem  value=''>No issues were found</MenuItem>}
  </Select>
</FormControl>

<FormControl sx={{minWidth: 150}} size="small">
      <InputLabel id="users-label">Select User</InputLabel>
      <Select
    labelId="users-label"
    id="users"
    label="Select user"
    value={userSel}
    onChange={handleChangeUser}
    variant='standard'
    >
      {users ? users.map((users,index) => (
         <MenuItem key={index} value={users.key}>{users.name}</MenuItem>
      ))  : <MenuItem  value=''>No users were found</MenuItem>}
  </Select>
</FormControl>
      </Grid>
   
      <Grid item xs={3}>

      <Grid container   justifyContent={'space-evenly'} alignItems={'center'} spacing={1}>
        <Grid item xs={7}>
        <AnimateButton> 
      <Button disableElevation disabled={!issue || !userSel} fullWidth size="small"
                      type="button" variant="contained" color="info">
                  Apply
                </Button>
       </AnimateButton>

        </Grid>
        <Grid item xs={1}  >
        <AnimateButton> 
      <Button disableElevation onClick={handleCancel}  fullWidth size="small"
                      type="button" variant="contained" color="inherit">
                  X
                </Button>
       </AnimateButton>
        </Grid>
   

      </Grid>

     
      </Grid>
    
   


 
      </Grid>
    )

}

export default AssignForm