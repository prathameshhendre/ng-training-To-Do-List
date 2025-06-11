import React, { useState, useEffect, useCallback } from 'react'; // Added useEffect, useCallback
import TaskTable from './TaskTable.jsx';
import TaskSearch from './TaskSearch.jsx';
import Pagination from './Pagination.jsx';
import Modal from './Modal.jsx';
import TaskForm from './TaskForm.jsx';

function TaskList() {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [tasks, setTasks] = useState([]); // Initialize tasks as an empty array
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

const [editTask, setEditTask] = useState(null)

  // Function to fetch tasks from the backend
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/tasks'); // Fetch all tasks
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data); // Update tasks state with fetched data
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means this function is created once

  // Use useEffect to call fetchTasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); // Dependency array ensures fetchTasks is called when it changes (though useCallback prevents frequent changes)

  // Function to open the Add Task modal
  const handleOpenAddTaskModal = () => {
    setShowAddTaskModal(true);
  };

  // Function to close the Add Task modal
  const handleCloseAddTaskModal = () => {
    setShowAddTaskModal(false);
    setEditTask(null);
  };

  // Function to handle adding a new task (makes API call and then refetches tasks)
  const handleAddTask = async (newTaskData) => {
    try {
      const response = await fetch('http://localhost:5000/api/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTaskData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // const addedTask = await response.json(); // You can use this if you want to update state optimistically
      console.log('Task added successfully.');
      handleCloseAddTaskModal(); // Close modal on success
      fetchTasks(); // Re-fetch all tasks to update the list
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Failed to add task. Please check your input.'); // Set specific error for add
    }
  };

  const handleDeleteTask = async (taskId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/task/${taskId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Refetch tasks or remove the deleted one from state
      fetchTasks(); // Assuming you have this function
    } else {
      console.error('Delete failed');
    }
  } catch (error) {
    console.error('Error deleting task:', error);
  }
   };

   const handleUpdateTask = async (updatedTaskData) => {
  try {
    const response = await fetch(`http://localhost:5000/api/task/${editTask._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTaskData),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    console.log('Task updated successfully.');
    handleCloseAddTaskModal();
    fetchTasks(); // Refresh task list
  } catch (err) {
    console.error('Error updating task:', err);
    setError('Failed to update task. Please try again.');
  }
  };



  return (
    <div className="slds-scope">
      {/* Page Header */}
      <div className="slds-page-header">
        <div className="slds-page-header__row">
          <div className="slds-page-header__col-title">
            <div className="slds-media">
              <div className="slds-media__figure">
                {/* Placeholder for icon if using SLDS icons */}
              </div>
              <div className="slds-media__body">
                <h1 className="slds-page-header__title slds-truncate slds-align-middle" title="Tasks">Tasks</h1>
              </div>
            </div>
          </div>
          <div className="slds-page-header__col-actions">
            <div className="slds-page-header__controls">
              <div className="slds-page-header__control">
                {/* Button to open the New Task modal */}
                <button className="slds-button slds-button_neutral" onClick={handleOpenAddTaskModal}>New Task</button>
              </div>
              <div className="slds-page-header__control">
                {/* Refresh button to re-fetch tasks */}
                <button className="slds-button slds-button_neutral" onClick={fetchTasks}>Refresh</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="slds-grid slds-wrap slds-m-around_medium">
        {/* <TaskSearch /> */}
      </div>

      {/* Loading/Error Indicators */}
      {loading && <div className="slds-text-align_center slds-m-vertical_large">Loading tasks...</div>}
      {error && <div className="slds-text-align_center slds-text-color_error slds-m-vertical_large">{error}</div>}

      {/* Task Table and Pagination - Only show if not loading and no critical error */}
      {!loading && !error && (
        <div className="slds-box slds-m-around_medium">
<TaskTable tasks={tasks} onDelete={handleDeleteTask} onEdit={(task) => {
  setEditTask(task);
  setShowAddTaskModal(true);
}} />{/* Pass fetched tasks to TaskTable */}
      
          {/* <Pagination totalRecords={tasks.length} /> Pass actual total records    */}


        </div>
      )}

      {/* New Task Modal */}
      <Modal show={showAddTaskModal} title="New Task" onClose={handleCloseAddTaskModal}>
<TaskForm
  onClose={handleCloseAddTaskModal}
  onSave={editTask ? handleUpdateTask : handleAddTask}
  initialValues={editTask || {}}
/>      </Modal>
    </div>
  );
}

export default TaskList;
