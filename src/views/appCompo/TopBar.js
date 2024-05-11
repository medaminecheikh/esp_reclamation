import React, {useEffect, useState} from 'react';
import {Grid, LinearProgress, Typography} from '@mui/material';
import getAverageResolutionTime from 'services/jiraAPI/requests/getAverageResolutionTime';
import getNumberOfPendingTasks from 'services/jiraAPI/requests/getNumberOfPendingTasks';
import getNumberOfCompletedTasks from 'services/jiraAPI/requests/getNumberOfCompletedTasks';
import getNumberOfAllBugs from 'services/jiraAPI/requests/getNumberOfAllBugs';

function TopBar() {
    const [average, setaverage] = useState('Loading..');
    const [pending, setpending] = useState('Loading..');
    const [completed, setcompleted] = useState('Loading..');
    const [bugs, setbugs] = useState('Loading..');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAverageResolutionTime();
                const pendingC = await getNumberOfPendingTasks();
                const compleC = await getNumberOfCompletedTasks();
                const bugC = await getNumberOfAllBugs();
                setbugs(bugC);
                setcompleted(compleC);
                setpending(pendingC);
                setaverage(response);

            } catch (error) {
                console.error('Error average:', error);
            }


        };

        fetchData();

        // Cleanup function (optional) if needed
        return () => {
            // Perform cleanup tasks if necessary
        };
    }, []);
// Calculate the maximum value among all statistics
    const maxStatValue = pending + bugs + completed;

// Calculate the progress for each statistic relative to the maximum value

    const progressPending = (pending / maxStatValue) * 100;
    const progressBugs = (bugs / maxStatValue) * 100;
    const progressCompleted = (completed / maxStatValue) * 100;
    const projectData = [
        {title: "Average Resolution", count: average, progress: 40, color: "secondary", h: "h4"},
        {title: "Pending Task", count: pending, progress: progressPending, color: "primary", h: "h3"},
        {title: "Pending bugs", count: bugs, progress: progressBugs, color: "error", h: "h3"},
        {title: " Completed Issues ", count: completed, progress: progressCompleted, color: "success", h: "h3"},
    ];
    return (
        <Grid container spacing={3}>
            {projectData.map((item) => (
                <Grid item xs={12} sm={6} lg={3} key={item.title}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2">{item.title}</Typography>
                        </Grid>
                        <Grid item xs={12} height={'34px'}>
                            <Typography variant={item.h}>{item.count}</Typography>
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
