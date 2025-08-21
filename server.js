const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let playerStats = []; // Temporary store

// POST /api/stats - save stats
app.post('/api/stats', (req, res) => {
    const stat = req.body;
    if (!stat.playerName || !stat.score || !stat.playTime) {
        return res.status(400).json({ error: 'Missing fields' });
    }
    playerStats.push(stat);
    res.status(201).json({ message: 'Stats saved' });
});

// GET /api/stats - retrieve all stats
app.get('/api/stats', (req, res) => {
    res.json(playerStats);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
