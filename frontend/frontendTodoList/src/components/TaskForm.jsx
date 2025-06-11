import React, { useState, useEffect } from 'react';

function TaskForm({ onClose, onSave, initialValues = {} }) {
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('Not Started');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setAssignedTo(initialValues.assignedTo || '');
    setStatus(initialValues.status || 'Not Started');
    setDueDate(initialValues.dueDate ? new Date(initialValues.dueDate).toISOString().split('T')[0] : '');
    setPriority(initialValues.priority || 'Normal');
    setDescription(initialValues.description || '');
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!assignedTo || !status || !priority) {
      console.error('Please fill in all required fields.');
      return;
    }

    const taskData = {
      assignedTo,
      status,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      priority,
      description,
    };

    onSave(taskData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="slds-grid slds-wrap slds-p-bottom_medium">
        {/* Assigned To */}
        <div className="slds-col slds-size_1-of-2 slds-p-horizontal_small">
          <div className="slds-form-element">
            <label className="slds-form-element__label" htmlFor="assignedTo">
              <abbr className="slds-required" title="required">*</abbr> Assigned To
            </label>
            <div className="slds-form-element__control">
              <input
                type="text"
                id="assignedTo"
                className="slds-input"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="slds-col slds-size_1-of-2 slds-p-horizontal_small">
          <div className="slds-form-element">
            <label className="slds-form-element__label" htmlFor="status">
              <abbr className="slds-required" title="required">*</abbr> Status
            </label>
            <div className="slds-form-element__control">
              <select
                id="status"
                className="slds-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Due Date */}
        <div className="slds-col slds-size_1-of-2 slds-p-horizontal_small slds-m-top_medium">
          <div className="slds-form-element">
            <label className="slds-form-element__label" htmlFor="dueDate">Due Date</label>
            <div className="slds-form-element__control">
              <input
                type="date"
                id="dueDate"
                className="slds-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Priority */}
        <div className="slds-col slds-size_1-of-2 slds-p-horizontal_small slds-m-top_medium">
          <div className="slds-form-element">
            <label className="slds-form-element__label" htmlFor="priority">
              <abbr className="slds-required" title="required">*</abbr> Priority
            </label>
            <div className="slds-form-element__control">
              <select
                id="priority"
                className="slds-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="slds-col slds-size_1-of-1 slds-p-horizontal_small slds-m-top_medium">
          <div className="slds-form-element">
            <label className="slds-form-element__label" htmlFor="description">Description</label>
            <div className="slds-form-element__control">
              <textarea
                id="description"
                className="slds-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <footer className="slds-modal__footer">
        <button type="button" className="slds-button slds-button_neutral" onClick={onClose}>Cancel</button>
        <button type="submit" className="slds-button slds-button_brand">
          {initialValues && initialValues._id ? 'Update' : 'Save'}
        </button>
      </footer>
    </form>
  );
}

export default TaskForm;
