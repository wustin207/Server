const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/stats', (req, res) => {
    const stats = req.body;
    const filePath = `./data/${stats.playerName}.json`;

    fs.writeFile(filePath, JSON.stringify(stats, null, 2), err => {
        if (err) return res.status(500).send('Failed to save stats');
        res.send('Stats saved!');
    });
});

app.get('/api/stats/:playerName', (req, res) => {
    const filePath = `./data/${req.params.playerName}.json`;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(404).send('Not found');
        res.type('json').send(data);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
