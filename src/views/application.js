import React, { useState } from 'react';
import MainCard from '../ui-component/cards/MainCard';

import { Button, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';
import DetailIssue from './appCompo/DetailIssue';
import ListIssuesAdmin from './appCompo/ListIssues';
import AnimateButton from 'ui-component/extended/AnimateButton';






function Application() {


    const [selectedUser, setSelectedUser] = useState(null);
    const [site, setSite] = useState('');
    const [status, setStatus] = useState('');
    const [priorite, setPriorite] = useState('');

    const handleUserSelect = (user) => {
      setSelectedUser(user);
      
    };

    const handleChangeSite = (event) => {
      setSite(event.target.value);
    };
    const handleChangestatus = (event) => {
      setStatus(event.target.value);
    };
    const handleChangePriorite = (event) => {
      setPriorite(event.target.value);
    };
   const handleCancel=()=>{
    setPriorite('');
    setStatus('');
    setSite('');
   }
   const handleSearch = ()=>{}
    
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
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
            </Grid>
            <Grid item xs={12}>
              
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
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  </FormControl>
            </Grid>
            <Grid item xs={12}>
              
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Priorite </Typography>
            </Grid>
            <Grid item xs={12}>
            <FormControl sx={{ minWidth: 150 }} size="small">
    
    <Select
      id="prio"
      value={priorite}
      onChange={handleChangePriorite}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  </FormControl>
            </Grid>
            <Grid item xs={12}>
              
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
          <ListIssuesAdmin onSelect={handleUserSelect} />
        </MainCard>
        </Grid>
      </Grid>
      </>);

}

export default Application;
