// backend/controllers/taskController.js
const Task = require('../models/Task'); // Import the Task model

// @desc    Create a new task
// @route   POST /api/task
// @access  Public
const createTask = async (req, res) => {
  try {
    const { assignedTo, status, dueDate, priority, description } = req.body;
    console.log(req.body) ; 

    if (!assignedTo || !status || !priority) {
      return res.status(400).json({ message: 'Please include all required fields: assignedTo, status, priority' });
    }

    const newTask = new Task({
      assignedTo,
      status,
      dueDate,
      priority,
      description
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
const getTasks = async (req, res) => {
  try {
    // Find all tasks in the database
    // The .sort({ createdAt: -1 }) will sort them by creation date, newest first.
    // As per previous instruction, avoiding orderBy, so fetching all and sorting in memory.
    // However, for initial fetch of all, a simple find() is sufficient and common.
    // If we later need sorting by a specific column, we'll implement it client-side.
    const tasks = await Task.find({});

    // Respond with the list of tasks
    res.status(200).json(tasks); // 200 OK status
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    console.log("Deleting task with ID:", taskId);

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ message: 'Server error while deleting task', error: err.message });
  }
};



const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  deleteTask,
  updateTask
};
