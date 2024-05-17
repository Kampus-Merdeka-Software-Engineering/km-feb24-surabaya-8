// Define the path to your local JSON file
const jsonFilePath = 'bikesales.json';

// Function to fetch and parse the JSON file
function loadJSONFile(filePath, callback) {
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Define the request method, file path, and set asynchronous to true
    xhr.open('GET', filePath, true);

    // Define the onload event handler
    xhr.onload = function() {
        // Check if the request was successful (status code 200)
        if (xhr.status === 200) {
            // Parse the JSON response
            const jsonData = JSON.parse(xhr.responseText);
            
            // Call the callback function with the parsed JSON data
            callback(null, jsonData);
        } else {
            // If the request was not successful, call the callback function with an error
            callback('Error loading JSON file: ' + filePath, null);
        }
    };

    // Define the onerror event handler
    xhr.onerror = function() {
        // Call the callback function with an error
        callback('Error loading JSON file: ' + filePath, null);
    };

    // Send the request
    xhr.send();
}

// Example usage:
loadJSONFile(jsonFilePath, function(error, data) {
    if (error) {
        console.error(error);
    } else {
        console.log('JSON data:', data);
        // Use the parsed JSON data here
    }
});

// // Form
// document.addEventListener('DOMContentLoaded', function() {
//     const contactFormContainer = document.getElementById('contactFormContainer');
//     const contactUsButton = document.getElementById('contactUsButton');
//     const closeButton = document.getElementById('closeButton');
//     const contactForm = document.getElementById('contactForm');
//     const notification = document.getElementById('notification');

//     contactUsButton.addEventListener('click', function(event) {
//         event.preventDefault(); // Prevent default link behavior
//         contactFormContainer.style.display = 'flex';
//     });

//     closeButton.addEventListener('click', function() {
//         contactFormContainer.style.display = 'none';
//     });

//     contactForm.addEventListener('submit', function(event) {
//         event.preventDefault();
//         if (contactForm.checkValidity()) {
//             displayNotification('Form submitted successfully!', 'success');
//             contactFormContainer.style.display = 'none';
//         } else {
//             displayNotification('Please fill in all required fields!', 'error');
//         }
//     });

//     function displayNotification(message, type) {
//         notification.innerHTML = `<div class="alert ${type}">${message}</div>`;
//     }
// });
