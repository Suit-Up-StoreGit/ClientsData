const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle JSON requests
app.use(express.json());

// Use the cors middleware
app.use(cors());

// Define your custom endpoint (e.g., /my-custom-endpoint)
app.post('/measurements', (req, res) => {
    // Handle the payload sent to this endpoint (assuming you have the data in req.body)
    const receivedData = req.body;

    // Log the received data
    console.log('Received data from Shopify:', receivedData);

    // Read existing data from measurements.json (if it exists)
    try {
        const filePath = 'measurements.json';
        const existingData = fs.existsSync(filePath)
            ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
            : {};

        // Update specific fields based on data from Shopify
        existingData.Neck = receivedData.Neck;
        existingData.Chest = receivedData.Chest;
        existingData.Waist = receivedData.Waist;
        existingData['Waist (at Belly Button)'] = receivedData['Waist (at Belly Button)'];
        existingData['Back Length'] = receivedData['Back Length'];
        existingData['Shoulder Width'] = receivedData['Shoulder Width'];
        existingData['Sleeve Length'] = receivedData['Sleeve Length'];
        existingData.Hip = receivedData.Hip;
        existingData.Thigh = receivedData.Thigh;
        existingData.Knee = receivedData.Knee;
        existingData.Calf = receivedData.Calf;
        existingData.Ankle = receivedData.Ankle;
        existingData.Inseam = receivedData.Inseam;

        // Write back to the file
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
        console.log('Data successfully updated in measurements.json');
        res.status(200).json({ message: 'Custom endpoint received the payload' });
    } catch (error) {
        console.error('Error updating measurements.json:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
