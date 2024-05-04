import React, { Component } from 'react';
import MainCard from '../ui-component/cards/MainCard';
import TopBar from './appCompo/TopBar';
import { Grid } from '@mui/material';





class Application extends Component {

  render() {
    return (<>
      <MainCard >
          <TopBar />
      </MainCard>
      <Grid container spacing={1} style={{marginTop:'3px'}}>
        <Grid item xs={8}>
        <MainCard ></MainCard>
        </Grid>
        <Grid item xs={4}>
        <MainCard ></MainCard>
        </Grid>
      </Grid>
      </>);
  }
}

export default Application;
