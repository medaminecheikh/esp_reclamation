import React, {useState, useEffect} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
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
            const arrayProject = projects.issues.map(issue => ({
                id: issue.fields.project.id,
                key: issue.fields.project.key,
                name: issue.fields.project.name,
                // Add more properties as needed
            }));
            console.log('Array of projects:', arrayProject);
            const uniqueProjects = [];
            arrayProject.forEach(project => {
            // Check if the project ID already exists in uniqueProjects
            const exists = uniqueProjects.some(item => item.id === project.id);
            
            // If the project ID doesn't exist, add it to uniqueProjects
            if (!exists) {
                uniqueProjects.push(project);
            }
        });
        
        console.log('Array of uniqueProjects:', uniqueProjects);
        }
    }, [projects]);


  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    {projects?.issues.map((issue, index)=>(
        <React.Fragment key={index}>
<Divider variant="inset" component="li" />
    <ListItem>
         <ListItemAvatar>
            <Avatar>
             <ImageIcon />
            </Avatar>
        </ListItemAvatar>
                  <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                 
                    <ListItemText primary={issue && issue.project && issue.project.name ? issue.project.name : "Unknown"} secondary="Jan 9, 2014" />
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
    </React.Fragment>
    ))}
         
    </List>
  )
}



export default IssueProject;
