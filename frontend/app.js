let currentUser = null;

// Login Function (Now connects to Backend)
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    fetch('http://localhost:3002/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) })
        }
        return response.json();
    })
    .then(data => {
        if (data.role) {
            currentUser = data.role;
            showSection();
        } else {
            alert("Invalid login.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error.message);
    });
}

// Show relevant section based on user type
function showSection() {
    document.getElementById("loginSection").style.display = "none";
    if (currentUser === "admin") {
        document.getElementById("adminSection").style.display = "block";
    } else if (currentUser === "user") {
        document.getElementById("nonAdminSection").style.display = "block";
    } else if (currentUser === "broker") {
        document.getElementById("brokerSection").style.display = "block";
    }
}

// Add Apartment (Admin)
function addApartment() {
    let floorNumber = prompt("Enter floor number:");
    let ownerName = prompt("Enter owner name:");
    let fund = prompt("Enter fund:");

    fetch('http://localhost:3002/apartments/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ floorNumber, ownerName, fund })
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
    })
    .catch(error => console.error('Error:', error));
}

// View Apartment Details (Admin)
function viewApartmentDetails() {
    fetch('http://localhost:3002/apartments')
    .then(response => response.json())
    .then(apartments => {
        let details = apartments.map(apartment => 
            `ID: ${apartment.id}, Floor: ${apartment.floorNumber}, Owner: ${apartment.ownerName}, Fund: ${apartment.fund}`
        ).join("\n");
        alert(details || "No apartments found.");
    })
    .catch(error => console.error('Error:', error));
}

// Record Complaint (Non-Admin)
function recordComplaint() {
    let complaintText = prompt("Enter your complaint:");

    fetch('http://localhost:3002/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ complaintText })
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
    })
    .catch(error => console.error('Error:', error));
}

// View Complaints (Admin, Non-Admin, Broker)
function viewComplaints() {
    fetch('http://localhost:3002/complaints')
    .then(response => response.json())
    .then(complaints => {
        let complaintList = complaints.map(complaint => 
            `Complaint ID: ${complaint.id}, Text: ${complaint.complaintText}`
        ).join("\n");
        alert(complaintList || "No complaints found.");
    })
    .catch(error => console.error('Error:', error));
}

// Resolve Complaint (Admin)
function resolveComplaint() {
    let complaintId = prompt("Enter complaint ID to resolve:");

    fetch(`http://localhost:3002/complaints/${complaintId}`, {
        method: 'DELETE'
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
    })
    .catch(error => console.error('Error:', error));
}

// View Own Details (Non-Admin)
function viewOwnDetails() {
    alert("Showing your details (e.g., owner name, apartment number, etc.)");
}

// View Available Apartments (Broker)
function viewAvailableApartments() {
    fetch('http://localhost:3002/apartments')
    .then(response => response.json())
    .then(apartments => {
        let availableApartments = apartments.filter(apartment => apartment.fund > 0);
        let apartmentList = availableApartments.map(apartment => 
            `ID: ${apartment.id}, Floor: ${apartment.floorNumber}, Owner: ${apartment.ownerName}, Fund: ${apartment.fund}`
        ).join("\n");
        alert(apartmentList || "No available apartments.");
    })
    .catch(error => console.error('Error:', error));
}
