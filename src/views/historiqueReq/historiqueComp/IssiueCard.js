import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Chip } from '@material-ui/core';

const UseStyles = makeStyles((theme) => ({
  card: {
    width: '75%',
    margin: theme.spacing(2),
    borderRadius: 10, // Adjust for desired smoothness
    boxShadow: theme.shadows[3], // Elevation effect
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  },
  footer: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

function IssueCard({ issue }) {
  const classes = UseStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.header}>
          <Typography variant="h4">{issue.fields.summary}</Typography>
          <div>
            <Chip label={issue.fields.issuetype.name} color="default" />
            <Chip
              label={getStatusChip(issue.fields.status.name)}
              color={issue.fields.status.name === 'In Progress' ? 'warning' : 'success'}
            />
          </div>
        </div>
        <div>
          <Typography variant="body1">
            <strong>Description:</strong> {issue.fields.description}
          </Typography>
          <Typography variant="body1">
            <strong>Reporter:</strong> {issue.fields.customfield_10112}
          </Typography>
          {/* ... other details ... */}
        </div>
        <div className={classes.footer}>
          <Typography variant="caption">Created at: {formatDate(issue.fields.created)}</Typography>
          <Typography variant="caption">Updated at: {formatDate(issue.fields.updated)}</Typography>
          {issue.fields.resolutiondate && (
            <Typography variant="caption">Resolved at: {formatDate(issue.fields.resolutiondate)}</Typography>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default IssueCard;