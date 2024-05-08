import React from 'react';
import MainCard from '../ui-component/cards/MainCard';
import { Grid } from '@mui/material';
import TopBar from './appCompo/TopBar';
import ProjetBody from './projetCompo/ProjetBody';

function Projet() {

 
    return (<>
      <MainCard >
          <TopBar />
      </MainCard>
      <Grid container spacing={1} style={{marginTop:'3px'}}>
        <ProjetBody/>
      </Grid>
      </>
    );
 
}

export default Projet;
