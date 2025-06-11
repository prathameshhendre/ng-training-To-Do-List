// backend/routes/taskRoutes.js
const express = require('express');
const { createTask, getTasks } = require('../controllers/taskController'); // Import getTasks

const router = express.Router();

// Route for creating a new task
router.post('/task', createTask);
console.log(createTask) ; 

// Route for getting all tasks
router.get('/tasks', getTasks); // New GET route

// Export the router
module.exports = router;
