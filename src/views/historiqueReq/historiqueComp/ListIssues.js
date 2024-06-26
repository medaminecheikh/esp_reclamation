import React from 'react'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';
import Chip from '@mui/material/Chip';
import Grow from '@mui/material/Grow';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

const cardStyle = {
    width: '600px',
    margin: '16px',
    borderRadius: '2px', // Adjust for desired smoothness
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
};

const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    alignItems: 'center'

};

const footerStyle = {
    marginTop: '8px',
    display: 'flex',
    justifyContent: 'space-between',
};

const formatDate = (dateString) => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(dateString).toLocaleDateString("en-US", options);
}
// Helper function to sort issues from latest to oldest based on the created date
const sortIssuesByDate = (issues) => {
    return issues.sort((a, b) => new Date(b.fields.created) - new Date(a.fields.created));
}

// Status to color and icon mapping
const statusAttributes = {
    "In Progress": {icon: <HourglassEmptyIcon/>, color: "primary"},
    "Done": {icon: <DoneIcon/>, color: "success"},
    "Default": {icon: <ErrorIcon/>, color: "secondary"} // Fallback for other statuses
};

function ListIssues({dataIssueByField, errorIssueByField}) {


    const getStatusChip = (statusName) => {
        const {icon, color} = statusAttributes[statusName] || statusAttributes["Default"];
        return <Chip icon={icon} label={statusName} color={color}/>;
    };

    if (!dataIssueByField) {
        return <div>No Data found. {errorIssueByField?.message}</div>;
    }

    if (dataIssueByField.length === 0) {
        return <div>No Data found. {errorIssueByField?.message}</div>;
    }
    return (

        <div>
            {sortIssuesByDate(dataIssueByField).map(issue => (
                <Grow
                    key={issue.id}
                    in={true}
                    timeout={2500} // Adjust the delay as needed
                >

                    <Card key={issue.id} style={cardStyle}>
                        <CardContent spacing={5} style={{overflow: 'auto', maxHeight: '250px'}}>
                            <div style={headerStyle}>
                                <Typography variant="h4">{issue.fields.labels.join(', ')}</Typography>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>

                                    <Chip
                                        label={getStatusChip(issue.fields.status.name)}
                                        color={issue.fields.status.name === 'In Progress' ? 'warning' : 'success'}
                                    />
                                </div>
                            </div>
                            <Divider></Divider>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 1
                            }}>
                                <Typography variant="body1" component="p">
                                    <strong>Site: </strong> {issue.fields.project.name}
                                </Typography>
                                <Typography variant="body1" component="p" style={{alignItems: 'center'}}>
                                    <strong> <KeyboardDoubleArrowUpIcon fontSize="small"
                                                                        color='error'/> {issue.fields.priority.name}
                                    </strong>
                                </Typography>
                            </div>

                            <Stack
                                direction="column"
                                alignItems="flex-start"
                                spacing={1} // This controls the space between each stack item
                            >
                                <Typography variant="body1" component="span">
                                    <strong>Sommaire:</strong> {issue.fields.summary}
                                </Typography>

                                <Typography variant="body1" component="div" sx={{width: '100%'}}>
                                    <strong>Description:</strong>
                                </Typography>
                                <Typography variant="body1" sx={{pl: 2}}>
                                    - {issue.fields.description}
                                </Typography>

                            


                                {/* Add other details with similar structure */}
                            </Stack>
                            <div style={footerStyle}>
                                <Typography variant="caption"> {issue.fields.customfield_10112}</Typography>
                                <Typography variant="caption">Created
                                    at: {formatDate(issue.fields.created)}</Typography>

                                {issue.fields.resolutiondate && (
                                    <Typography variant="caption">Resolved
                                        at: {formatDate(issue.fields.resolutiondate)}</Typography>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                </Grow>
            ))}
        </div>

    );
}

export default ListIssues
