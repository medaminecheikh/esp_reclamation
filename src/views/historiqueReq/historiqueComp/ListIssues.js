import React from 'react'
import GetIssueByField from "../../../services/jiraAPI/requests/getIssueByfield";
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';
import Chip from '@mui/material/Chip';
import Grow from '@mui/material/Grow';


const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString("en-US", options);
}
// Helper function to sort issues from latest to oldest based on the created date
const sortIssuesByDate = (issues) => {
  return issues.sort((a, b) => new Date(b.fields.created) - new Date(a.fields.created));
}

// Status to color and icon mapping
const statusAttributes = {
  "In Progress": { icon: <HourglassEmptyIcon />, color: "primary" },
  "Done": { icon: <DoneIcon />, color: "success" },
  "Default": { icon: <ErrorIcon />, color: "secondary" } // Fallback for other statuses
};
function ListIssues() {
     const { dataIssueByField, errorIssueByField } = GetIssueByField();

  if (errorIssueByField) {
    return <div>Error: {errorIssueByField.message}</div>;
        }
         const getStatusChip = (statusName) => {
    const { icon, color } = statusAttributes[statusName] || statusAttributes["Default"];
    return <Chip icon={icon} label={statusName} color={color} />;
  };
  return (
    <div>
      <h1>List of Issues</h1>
      {dataIssueByField && dataIssueByField.issues.length > 0 ? (
        <ul>
          {sortIssuesByDate(dataIssueByField.issues).map(issue => (
             <Grow
              key={issue.id}
              in={true}
              timeout={2500 } // Adjust the delay as needed
            >
            <li key={issue.id}>
              <h3>{issue.fields.summary}</h3>
              <p><strong>Issue Type:</strong> {issue.fields.issuetype.name}</p>
              <p><strong>Description:</strong> {issue.fields.description}</p>
              <div><strong>Status:</strong>  {getStatusChip(issue.fields.status.name)}</div>
              <p><strong>Reporter:</strong> {issue.fields.customfield_10112}</p>
              <p><strong>Project:</strong> {issue.fields.project.name}</p>
              <p><strong>Priority:</strong> {issue.fields.priority.name}</p>
              <p><strong>Labels:</strong> {issue.fields.labels.join(', ')}</p>
              <div>Created at: {formatDate(issue.fields.created)}</div>
              <div>Updated at: {formatDate(issue.fields.updated)}</div>
              {issue.fields.resolutiondate && 
                <div>Resolved at: {formatDate(issue.fields.resolutiondate)}</div>
              }
              {/* Add more fields as needed */}
            </li>
            </Grow>
          ))}
        </ul>
      ) : (
        <div>No issues found.</div>
      )}
    </div>
  );
}
export default ListIssues