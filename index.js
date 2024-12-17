const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your-secret-key'; // Replace with a secure key
let users = []; // Mock database for users
// Mock Data
const gyms = [
    { id: 1, name: 'FitGym', location: 'Downtown', phone: '123-456-7890' },
    { id: 2, name: 'PowerGym', location: 'Uptown', phone: '987-654-3210' },
];
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test Endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



// Endpoint to Get All Gyms
app.get('/api/gyms', (req, res) => {
    res.json(gyms);
});


// Register Endpoint
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    if (users.some(user => user.username === username)) {
        return res.status(400).json({ message: 'User already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully!' });
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid username or password!' });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login successful!', token });
});