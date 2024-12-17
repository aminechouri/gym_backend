const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const gymRoutes = require('./routes/gymRoutes'); // Import routes

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/gym', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', gymRoutes); // Prefix routes with /api

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
