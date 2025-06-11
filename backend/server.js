// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors middleware

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON request bodies
app.use(express.json());

// Enable CORS for all origins during development.
// In production, you'd configure this more strictly, e.g.,
// cors({ origin: 'http://localhost:3000' }); or 'http://localhost:5173' for Vite
app.use(cors());

// Basic route for testing server
app.get('/', (req, res) => {
  res.send('To-Do List API is running!');
});

// Import task routes
const taskRoutes = require('./routes/taskRoutes');

// Mount task routes under /api prefix
app.use('/api', taskRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully!');
    // Start the server only after successful database connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  });
