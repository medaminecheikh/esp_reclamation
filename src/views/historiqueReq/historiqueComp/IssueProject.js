import React, {useState, useEffect} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function IssueProject({myProjects}) {
     const [projects, setProjects] = useState(null);
      // useEffect to update state whenever myProjects changes
    useEffect(() => {
        if (myProjects) {
            setProjects(myProjects);
              console.log('Updated myProjects:', myProjects);
        }
    }, [myProjects]); 
     useEffect(() => {
        if (projects) {
            console.log('Updated projects:', projects);
        }
    }, [projects]);
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <Divider variant="inset" component="li" />
           
      <ListItem>
         <ListItemAvatar>
            <Avatar>
             <ImageIcon />
            </Avatar>
        </ListItemAvatar>
                  <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                 
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                </Grid>
                <Grid item>
                   <Avatar variant="rounded" sx={{  bgcolor: 'error.main',
            width: 24,  
            height: 24, 
            fontSize: '0.875rem'}} >
                        <Typography variant="h6" color="common.white"> 5 </Typography>
                    </Avatar>
                </Grid>
            </Grid>
        </ListItem>
            <Divider variant="inset" component="li" />

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Work" secondary="Jan 7, 2014" />
      </ListItem>
            <Divider variant="inset" component="li" />

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Vacation" secondary="July 20, 2014" />
      </ListItem>
      
    </List>
  )
}



export default IssueProject;
