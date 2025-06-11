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

// Export all controller functions
module.exports = {
  createTask,
  getTasks,
  // Other CRUD functions will be added here later
};
