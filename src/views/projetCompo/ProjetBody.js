import {
    Alert,
    Avatar,
    Button,
    Chip,
    Divider,
    Grid,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material'
import React, {useState} from 'react'
import getProjectById from 'services/jiraAPI/requests/getProjetById';
import UseGetJiraData from 'services/jiraAPI/requests/useGetJiraData';
import MainCard from 'ui-component/cards/MainCard'
import GetAllIssues from 'services/jiraAPI/requests/GetAllIssues';
import getassignableUsersToProject from 'services/jiraAPI/requests/getassignableUsers';
import AnimateButton from 'ui-component/extended/AnimateButton';
import AssignForm from './AssignForm';

function ProjetBody() {
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [errorGet, setErrorGet] = useState(null);
    const [project, setproject] = useState(null);
    const [issues, setissues] = useState(null);
    const [availableUsers, setAvailableUsers] = useState(null);
    const {data, error} = UseGetJiraData();
    const handleUnSelect = () => {
        setSelectedRowIndex(null);
        setissues(null);
        setproject(null);
        setAvailableUsers(null);
    }
    const handleUserSelect = async (row, index) => {
        setSelectedRowIndex(index);

        if (row) {
            try {
                const response = await getProjectById(row.id);
                const site = row.id;
                const responseIssue = await GetAllIssues({site});
                const available = await getassignableUsersToProject(row.key);
               
                setissues(responseIssue);
                setAvailableUsers(available);
                setproject(response.data);
                console.log('responseIssue', responseIssue.data);
                
             
                console.log('Project by id:', response);
            } catch (error) {
                setErrorGet(error)
                console.error(error);
            }
        }
    }
    return (
        <>
            <Grid item xs={12}>
                <MainCard >
                    <Grid container spacing={3}>
                        <Grid item xs={7}>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h3" textAlign="center">Projet: {project?.name}</Typography>
                                    <Divider style={{marginTop: '10px'}}></Divider>
                                    <Typography variant="body1">{project?.description}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h4">Information :</Typography>
                                    {project?.components?.map(component => (
                                        <Chip
                                            key={component.id}
                                            label={component.name}
                                            avatar={<Avatar alt={component.name} src={component.metadata?.icon}/>}
                                            style={{marginRight: '5px', marginBottom: '5px'}}
                                        />
                                    ))}
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5">Project Lead:</Typography>
                                    <Chip
                                        label={project?.lead?.displayName}
                                        avatar={<Avatar alt={project?.lead?.displayName}
                                                        src={project?.lead?.avatarUrls['48x48']}/>}
                                        style={{marginRight: '5px', marginTop: '7px'}}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5">Issue Types:</Typography>
                                    {project?.issueTypes?.map(issueType => (
                                        <Chip
                                            variant='outlined'
                                            color='primary'
                                            key={issueType.id}
                                            label={issueType.name}
                                            style={{marginRight: '5px', marginTop: '7px'}}
                                        />
                                    ))}
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5">Team:</Typography>
                                    <Chip
                                        label={project?.lead?.displayName}
                                        avatar={<Avatar alt={project?.lead?.displayName}
                                                        src={project?.lead?.avatarUrls['48x48']}/>}
                                        style={{marginRight: '5px', marginTop: '7px'}}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h6">-- Users Not assigned:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1"
                                                textAlign="right">{availableUsers?.data?.length || 'Not available'}</Typography>

                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h6">-- Total Issue Count:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h5"
                                                textAlign="right">{issues?.data?.total || 'Not available'}</Typography>
                                </Grid>

                            </Grid>
                            <Grid> <Divider style={{marginTop: '12px'}}></Divider></Grid>
                            <Grid item xs={12} sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                marginTop: '12px'
                            }}>

                                <Stack direction="row" spacing={2}>
                                    <AnimateButton>
                                        <Button disabled={!selectedRowIndex} onClick={handleUnSelect} size='small'
                                                color='primary' variant="outlined">
                                            Assign User
                                        </Button>
                                    </AnimateButton>
                                    <Grid item sx={{width: '180px'}}>
                                        <AnimateButton>
                                            <Button disableElevation onClick={handleUnSelect} fullWidth size="small"
                                                    type="button" variant="contained" color="inherit">
                                                Cancel
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Stack>
                            </Grid>
                            {error ? <Alert severity='error'> error has occured</Alert> : null}
                            {errorGet ? <Alert severity='error'> error has occured</Alert> : null}
                        </Grid> <Grid item> <Divider orientation='vertical'></Divider></Grid>
                        <Grid item style={{flexGrow: 1}}>
                            <TableContainer component={Paper} style={{maxHeight: 400, minHeight: '400px'}}>
                                <Table stickyHeader size="small" aria-label="simple table">
                                    <TableHead>

                                        <TableRow>
                                            <TableCell align="left">Nom Projet </TableCell>


                                            <TableCell align="center"> Type </TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody style={{overflow: 'auto'}}>
                                        {data ? data?.map((row, index) => (
                                            <TableRow
                                                style={{
                                                    cursor: 'pointer',
                                                    backgroundColor: selectedRowIndex === index ? '#cbe6ef' : 'transparent'
                                                }} // Change background color of selected row

                                                onDoubleClick={() => handleUserSelect(row, index)}
                                                key={index} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                <TableCell component="th">{row?.name}</TableCell>

                                                <TableCell align="center">
                                                    <Chip variant='filled' color='secondary' size='small'
                                                          label={row?.projectTypeKey}></Chip>
                                                </TableCell>
                                            </TableRow>
                                        )) : <TableRow><TableCell component="th">No data Found !</TableCell></TableRow>}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
            <Grid item xs={8} >
            <MainCard>
                <AssignForm projectKey={project?.key}/>
            </MainCard>
            </Grid>

        </>
    )
}

export default ProjetBody
