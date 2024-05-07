import React, { useEffect, useState } from 'react';
import MainCard from '../ui-component/cards/MainCard';

import { Button, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';
import DetailIssue from './appCompo/DetailIssue';
import ListIssuesAdmin from './appCompo/ListIssues';
import AnimateButton from 'ui-component/extended/AnimateButton';
import UseGetJiraData from 'services/jiraAPI/requests/useGetJiraData';
import GetAllIssues from 'services/jiraAPI/requests/GetAllIssues';






function Application() {


    const [selectedUser, setSelectedUser] = useState(null);
    const [site, setSite] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriorite] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { data, error } = UseGetJiraData();

    useEffect(() => {
      if (data && data.length > 0) {
        console.warn('use effect called ');
   
          setSite(data[0].key); 
       
      }
  }, [ data]);

    const handleUserSelect = (user) => {
      setSelectedUser(user);
      
    };

    const handleChangeSite = (event) => {
      setSite(event.target.value);
      console.log(site);
    };
    const handleChangestatus = (event) => {
      setStatus(event.target.value);
    };
    const handleChangePriorite = (event) => {
      setPriorite(event.target.value);
    };
   const handleCancel=()=>{
    if (data && data.length > 0) {
      setSite(data[0].key);
    }
    setPriorite('');
    setStatus('');
   
   }
   const handleSearch = async ()=>{
    try {
      const response = await GetAllIssues({priority,status,site});
      setSearchResults(response.data.issues); // Assuming the response contains an 'issues' array
      console.log("Search", searchResults)
  } catch (error) {
      console.error('Error searching issues:', error);
  }
   }
    
    return (<>
      <MainCard >
      <Grid container spacing={3}>
      <Grid item xs={12} sm={6} lg={3}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Site Web </Typography>
            </Grid>
            <Grid item xs={12}>
   <FormControl sx={{ minWidth: 150 }} size="small">
    
      <Select
        id="demo-select-small"
        value={site}
        onChange={handleChangeSite}
      >
       {error ? (
    <MenuItem disabled>Error fetching Sites</MenuItem>
) : (
    data && data.length > 0 ? (
        data.map((project) => (
            <MenuItem key={project.key} value={project.key}>{project.name}</MenuItem>
        ))
    ) : (
        <MenuItem disabled>No projects found</MenuItem>
    )
)}
      </Select>
    </FormControl>
            </Grid>
    
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Status </Typography>
            </Grid>
            <Grid item xs={12}>
  <FormControl sx={{ minWidth: 150 }} size="small">
    
    <Select
      id="status"
      value={status}
      onChange={handleChangestatus}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={'To Do'}>To Do</MenuItem>
      <MenuItem value={'In Progress'}>In Progress</MenuItem>
      <MenuItem value={'Done'}>Done</MenuItem>
    </Select>
  </FormControl>
            </Grid>
       
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="subtitle2">priority </Typography>
            </Grid>
            <Grid item xs={12}>
            <FormControl sx={{ minWidth: 150 }} size="small">
    
    <Select
      id="prio"
      value={priority}
      onChange={handleChangePriorite}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value="4">Low</MenuItem>
                <MenuItem value="3">Medium</MenuItem>
                <MenuItem value="2">High</MenuItem>
    </Select>
  </FormControl>
            </Grid>
           
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Options </Typography>
            </Grid>
            <Grid item xs={8}>   
              <AnimateButton>
                <Button
                  disableElevation
                  fullWidth
                  size="small"
                  type="button"
                  variant="contained"
                  color="warning"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </AnimateButton>
              </Grid>
            <Grid item xs={4}>
        
              <AnimateButton>
                <Button
                  disableElevation
                  fullWidth
                  size="small"
                  type="button"
                  variant="contained"
                  color="inherit"
                  onClick={handleCancel}
                >
                  Reset
                </Button>
              </AnimateButton>
            </Grid>
        
            <Grid item xs={12}>
              
            </Grid>
          </Grid>
        </Grid>
   </Grid>
      </MainCard>
      <Grid container spacing={1} style={{marginTop:'3px'}}>
        <Grid item xs={7}>
        <MainCard >
        <DetailIssue User={selectedUser}/>
        </MainCard>
        </Grid>
        <Grid item xs={5}>
        <MainCard >
          <ListIssuesAdmin onSelect={handleUserSelect} SearchIssues={searchResults} />
        </MainCard>
        </Grid>
      </Grid>
      </>);

}

export default Application;
