// JavaScript Code

// Initialize the map
var map = L.map('map').setView([51.505, -0.09], 13);

// Set up the OpenStreetMap layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Listen for map clicks to add a new alert
map.on('click', function(e) {
    // Get the coordinates where the user clicked
    var coords = e.latlng;

    // Prompt the user for alert details
    var alertType = document.getElementById('alertType').value;
    var alertDescription = document.getElementById('alertDescription').value;

    if (alertType && alertDescription) {
        // Create a new marker at the clicked location
        var marker = L.marker([coords.lat, coords.lng]).addTo(map);

        // Bind a popup to the marker with the alert details
        marker.bindPopup(`<strong>${alertType} Alert</strong><br>${alertDescription}`).openPopup();

        // Show success message
        var successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';

        // Hide success message after 3 seconds
        setTimeout(function() {
            successMessage.style.display = 'none';
        }, 3000);

        // Clear the form fields
        document.getElementById('alertForm').reset();

        // Remove the marker after 5 minutes (300000 milliseconds)
        setTimeout(function() {
            map.removeLayer(marker);
        }, 300000);
    } else {
        alert('Please fill out the alert type and description.');
    }
});

// Prevent form submission (optional if using the map to submit alerts)
document.getElementById('alertForm').addEventListener('submit', function(e) {
    e.preventDefault();
});
