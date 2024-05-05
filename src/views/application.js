import React, { Component } from 'react';
import MainCard from '../ui-component/cards/MainCard';
import TopBar from './appCompo/TopBar';
import { Grid } from '@mui/material';
import DetailIssue from './appCompo/DetailIssue';
import ListIssuesAdmin from './appCompo/ListIssues';





class Application extends Component {

  render() {
    return (<>
      <MainCard >
          <TopBar />
      </MainCard>
      <Grid container spacing={1} style={{marginTop:'3px'}}>
        <Grid item xs={7}>
        <MainCard >
        <DetailIssue />
        </MainCard>
        </Grid>
        <Grid item xs={5}>
        <MainCard >
          <ListIssuesAdmin />
        </MainCard>
        </Grid>
      </Grid>
      </>);
  }
}

export default Application;
