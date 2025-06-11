// backend/models/Task.js
const mongoose = require('mongoose');

// Define the schema for a Task
// This schema defines the structure and types of the fields for each task document.
const taskSchema = new mongoose.Schema({
  assignedTo: {
    type: String,
    required: true, // This field is mandatory
    trim: true      // Remove whitespace from both ends of a string
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'], // Enumerate allowed values
    default: 'Not Started', // Set a default value if not provided
    required: true
  },
  dueDate: {
    type: Date, // Date type for dates
    required: false // Not strictly mandatory as per wireframe, but good to have
  },
  priority: {
    type: String,
    enum: ['Low', 'Normal', 'High'], // Enumerate allowed values
    default: 'Normal', // Set a default value
    required: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  // Adding timestamps to automatically manage createdAt and updatedAt fields
  createdAt: {
    type: Date,
    default: Date.now // Default to current time when created
  },
  updatedAt: {
    type: Date,
    default: Date.now // Default to current time, will be updated manually or via middleware later
  }
}, {
  // Options for the schema
  timestamps: true // Automatically adds createdAt and updatedAt fields.
                   // If you enable this, you can remove manual createdAt and updatedAt fields above
                   // and Mongoose will handle them. Let's keep `timestamps: true` as it's cleaner.
});

// If you use `timestamps: true`, you can simplify the schema fields like this:
// const taskSchema = new mongoose.Schema({
//   assignedTo: { type: String, required: true, trim: true },
//   status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started', required: true },
//   dueDate: { type: Date }, // No required: false needed, it's optional by default
//   priority: { type: String, enum: ['Low', 'Normal', 'High'], default: 'Normal', required: true },
//   description: { type: String, trim: true }
// }, {
//   timestamps: true // This adds createdAt and updatedAt
// });


// Create the Mongoose model from the schema.
// 'Task' will be the name of the collection in MongoDB (it will be pluralized to 'tasks').
const Task = mongoose.model('Task', taskSchema);

// Export the Task model so it can be used in other parts of the application
module.exports = Task;