import React, { Component } from 'react'

export class AssignForm extends Component {
 
  render() {
    const project = this.props.projectKey;
    return (
      <div>AssignForm   {project}</div>
    )
  }
}

export default AssignForm