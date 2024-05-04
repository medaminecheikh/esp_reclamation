import React from 'react';
import { Grid, LinearProgress, Typography } from '@mui/material';
const projectData = [
  { title: "Published Project", count: 532, progress: 40, color: "secondary" },
  { title: "Completed Task", count: 4569, progress: 70, color: "primary" },
  { title: "Pending Task", count: 1005, progress: 30, color: "error" },
  { title: "Issues", count: 365, progress: 10, color: "success" },
];
function TopBar() {
  return (
    <Grid container spacing={3}>
      {projectData.map((item) => (
        <Grid item xs={12} sm={6} lg={3} key={item.title}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="subtitle2">{item.title}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h3">{item.count}</Typography>
            </Grid>
            <Grid item xs={12}>
              <LinearProgress
                variant="determinate"
                value={item.progress}
                color={item.color}
              />
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}

export default TopBar