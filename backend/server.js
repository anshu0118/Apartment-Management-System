const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Serve Frontend Files
app.use(express.static(path.join(__dirname, '../frontend')));

// Hardcoded users for login validation (for testing purposes)
// In-memory data for apartments and complaints (for demo purposes)
let apartments = [
    { id: 1, floorNumber: 1, ownerName: 'Aditya', fund: 5000 },
    { id: 2, floorNumber: 2, ownerName: 'Bhabani', fund: 7000 }
];

let complaints = [
    { id: 1, complaintText: 'Water leakage in apartment 101' },
    { id: 2, complaintText: 'Elevator not working' }
];

// ✅ GET /login (For Debugging)
app.get('/login', (req, res) => {
    res.send("Login page is working, but use POST instead.");
});

// ✅ POST /login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Simple check for username and password
    if (username === "admin" && password === "password123") {
        role = "admin";
        res.status(200).json({ message: "Login successful", role: role });
    } else if (username === "user" && password === "userpassword") {
        role = "user";
        res.status(200).json({ message: "Login successful", role: role });
    } else if (username === "broker" && password === "brokerpassword") {
        role = "broker";
        res.status(200).json({ message: "Login successful", role: role });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// ✅ POST /apartments/add Route (Admin only)
app.post('/apartments/add', (req, res) => {
    const { floorNumber, ownerName, fund } = req.body;
    const newApartment = {
        id: apartments.length + 1,  
        floorNumber,
        ownerName,
        fund
    };
    apartments.push(newApartment);
    res.send('Apartment added successfully!');
});

// ✅ GET /apartments Route
app.get('/apartments', (req, res) => {
    res.json(apartments);
});

// ✅ POST /complaints Route (Non-admin only)
app.post('/complaints', (req, res) => {
    const { complaintText } = req.body;
    const newComplaint = {
        id: complaints.length + 1,  
        complaintText
    };
    complaints.push(newComplaint);
    res.send('Complaint recorded successfully!');
});

// ✅ GET /complaints Route (Admin, Non-Admin, Broker)
app.get('/complaints', (req, res) => {
    res.json(complaints);
});

// ✅ DELETE /complaints/:id Route (Admin only)
app.delete('/complaints/:id', (req, res) => {
    const { id } = req.params;
    complaints = complaints.filter(complaint => complaint.id !== parseInt(id));
    res.send(`Complaint with ID ${id} resolved and removed.`);
});

// ✅ Serve API Routes
const usersRoutes = require('./routes/users');
const apartmentsRoutes = require('./routes/apartments');
const complaintsRoutes = require('./routes/complaints');

app.use('/api/users', usersRoutes);
app.use('/api/apartments', apartmentsRoutes);
app.use('/api/complaints', complaintsRoutes);

// ✅ Start the Server
const port = 3002;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
