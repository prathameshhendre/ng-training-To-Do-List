import React from 'react';

function TaskTable({ tasks , onDelete, onEdit }) { // Receives tasks as a prop
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
        {tasks && tasks.length > 0 ? (
          tasks.map(task => (
            <tr key={task._id}>
              <td>{task.assignedTo}</td>
              <td>{task.status}</td>
              <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</td>
              <td>{task.priority}</td>
              <td>{task.description || 'No comments'}</td>
              <td>
                <button className="slds-button slds-button_neutral slds-m-right_x-small" onClick={() => onEdit(task)} >Edit</button>
                <button
                  className="slds-button slds-button_destructive"
                  onClick={() => onDelete(task._id)}
                >
                  Delete
                </button>
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
