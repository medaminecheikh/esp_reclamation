import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'
import getAssignableUsers from 'services/jiraAPI/requests/getAssignableUsersToIssue';

 function AssignForm(props) {
    const [issue, setIssue] = useState('');
    const [userS, setUserSel] = useState('');
    const [users, setUsers] = useState([]);

    const handleChangeUser = (event) => {
      setUserSel(event.target.value);
   
  };

  const handleChangeIssues = (event) => {
    setIssue(event.target.value);
 
};
    const {project, issues } = props;
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const projectKey = project?.key;
          const issueKey = issue;
          if(projectKey && issueKey){
            const response = await getAssignableUsers({projectKey, issueKey});
          setUsers(response);
          }else{setUsers([]);}
         
          
        } catch (error) {
          console.error('Error fetching assignable users:', error);
          // Handle error if needed
        }
      };
    
      fetchData();
    
      // Clean up function
      return () => {
        // Any cleanup code here
      };
    }, [project, issue]);
    
    return (
      <div>AssignForm   {project?.key || "no selection"}
      
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
    value={userS}
    onChange={handleChangeUser}
    variant='standard'
    >
      {users ? users.map((users,index) => (
         <MenuItem key={index} value={users.key}>{users.name}</MenuItem>
      ))  : <MenuItem  value=''>No users were found</MenuItem>}
  </Select>
</FormControl>

      </div>
    )

}

export default AssignForm