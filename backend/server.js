const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// In-memory store for demonstration purposes
let postureHistory = [];

app.get('/api/history', (req, res) => {
    res.json(postureHistory);
});

app.post('/api/history', (req, res) => {
    const newData = req.body;
    postureHistory.push(newData);
    console.log('Received new posture data:', newData);
    res.status(201).json({ message: 'Data saved successfully' });
});

app.listen(port, () => {
    console.log(`Posture Coach backend listening at http://localhost:${port}`);
});
