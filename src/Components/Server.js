// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

// Define MongoDB schema and models using Mongoose

// Define routes
app.get('/movies', async (req, res) => {
    // Fetch movies from MongoDB
});

app.post('/movies', async (req, res) => {
    // Create a new movie document in MongoDB
});

// Add more routes for other CRUD operations as needed

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
