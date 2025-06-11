// backend/routes/taskRoutes.js
const express = require('express');
const { createTask, getTasks, deleteTask ,updateTask} = require('../controllers/taskController'); // Import getTasks

const router = express.Router();

// Route for creating a new task
router.post('/task', createTask);
console.log(createTask) ; 

// Route for getting all tasks
router.get('/tasks', getTasks); // New GET route

router.delete('/task/:id', deleteTask);

router.put('/task/:id', updateTask);

// Export the router
module.exports = router;
