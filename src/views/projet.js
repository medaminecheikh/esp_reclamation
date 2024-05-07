import React, { Component } from 'react';
import MainCard from '../ui-component/cards/MainCard';
import { Grid } from '@mui/material';
import TopBar from './appCompo/TopBar';

class Projet extends Component {
  render() {
    return (<>
      <MainCard >
          <TopBar />
      </MainCard>
      <Grid container spacing={1} style={{marginTop:'3px'}}>
        <Grid item xs={7}>
        <MainCard >
     
        </MainCard>
        </Grid>
        <Grid item xs={5}>
        <MainCard >
         
        </MainCard>
        </Grid>
      </Grid>
      </>
    );
  }
}

export default Projet;
