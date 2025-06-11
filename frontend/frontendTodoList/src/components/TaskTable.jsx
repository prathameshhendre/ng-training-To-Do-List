import React from 'react';

function TaskTable({ tasks }) { // Receives tasks as a prop
  return (
    <table className="slds-table slds-table_cell-buffer slds-table_bordered slds-table_striped">
      <thead>
        <tr className="slds-line-height_reset">
          <th scope="col">
            <div className="slds-truncate" title="Assigned To">Assigned To</div>
          </th>
          <th scope="col">
            <div className="slds-truncate" title="Status">Status</div>
          </th>
          <th scope="col">
            <div className="slds-truncate" title="Due Date">Due Date</div>
          </th>
          <th scope="col">
            <div className="slds-truncate" title="Priority">Priority</div>
          </th>
          <th scope="col">
            <div className="slds-truncate" title="Comments">Comments</div>
          </th>
          <th scope="col">
            <div className="slds-truncate" title="Actions">Actions</div>
          </th>
        </tr>
      </thead>
      <tbody>
        {/* Check if tasks array is not empty before mapping */}
        {tasks && tasks.length > 0 ? (
          tasks.map(task => (
            <tr key={task._id}> {/* Use task._id from MongoDB as key */}
              <td data-label="Assigned To">{task.assignedTo}</td>
              <td data-label="Status">{task.status}</td>
              {/* Format date for display if it exists */}
              <td data-label="Due Date">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</td>
              <td data-label="Priority">{task.priority}</td>
              <td data-label="Comments">{task.description || 'No comments'}</td> {/* Use description field */}
              <td>
                <button className="slds-button slds-button_neutral slds-m-right_x-small">Edit</button>
                <button className="slds-button slds-button_destructive">Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="slds-text-align_center">No tasks found. Add a new task!</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default TaskTable;
