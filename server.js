const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle JSON requests
app.use(express.json());

// Use the cors middleware
app.use(cors());

// Initialize an empty object to store data
let clientData = {};

// Define your custom endpoint (e.g., /my-custom-endpoint)
app.post('/measurements', (req, res) => {
    // Handle the payload sent to this endpoint (assuming you have the data in req.body)
    const receivedData = req.body;

    // Log the received data
    console.log('Received data from Shopify:', receivedData);

    // Generate a unique filename based on the current timestamp
    const timestamp = Date.now();
    const fileName = `Client_${timestamp}.json`;

    // Write the data to the new file
    fs.writeFileSync(path.join(__dirname, fileName), JSON.stringify(receivedData, null, 2));
    console.log(`Data successfully saved in ${fileName}`);

    // Store the data in the clientData object
    clientData[fileName] = receivedData;

    res.status(200).json({ message: 'Custom endpoint received the payload' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
