import React, {useState, useEffect} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';


function IssueProject({myProjects}) {
    const [projects, setProjects] = useState(null);
    const [projectArray, setProjectArray] = useState([]);

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
                repeated: 1,
                // Add more properties as needed
            }));
            console.log('Array of projects:', arrayProject);
            const uniqueProjects = [];
            // Iterate through each project in arrayProject
            arrayProject.forEach(project => {
                // Find if the project already exists in uniqueProjects
                const existingProject = uniqueProjects.find(item => item.id === project.id);

                // If the project doesn't exist, add it to uniqueProjects
                if (!existingProject) {
                    uniqueProjects.push({...project, repeated: 1});
                } else {
                    // If the project already exists, increment its repetition count
                    existingProject.repeated++;
                }
            });
            setProjectArray(uniqueProjects);
            console.log('Array of uniqueProjects:', uniqueProjects);
        }
    }, [projects]);
    if (!projectArray || projectArray.length === 0) {
        return (
            <Grid container display="flex" justifyContent="center" alignItems="center">
                <Grid item>
                    <Divider style={{marginBottom: '5px'}}/>
                    <Typography variant="h5" color="textSecondary" style={{
                        display: 'flex', justifyContent: 'space-between'
                    }} alignItems="center">
                        <InfoIcon fontSize="large" color="primary"/> <p style={{marginLeft: '10px'}}> Aucun ticket
                        trouvé sur nos plateformes</p>
                    </Typography>
                    <Divider style={{marginTop: '5px'}}/>
                </Grid>
            </Grid>
        )
    }

    return (
        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            {projectArray.map((project, index) => (
                <React.Fragment key={index}>
                    <Divider variant="inset" component="li"/>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <SchoolRoundedIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item>

                                <ListItemText primary={project && project.name ? project.name : "Unknown"}
                                              secondary="Jan 9, 2014"/>
                            </Grid>
                            <Grid item>
                                <Avatar variant="rounded" sx={{
                                    bgcolor: 'error.main',
                                    width: 24,
                                    height: 24,
                                    fontSize: '0.875rem'
                                }}>
                                    <Typography variant="h6"
                                                color="common.white"> {project && project.repeated} </Typography>
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
