const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let playerStats = []; // Temporary store

//POST /api/stats - save stats
app.post('/api/stats', (req, res) => {
    const stat = req.body;

    //Check for required fields
    const {
        playerKills,
        playerDeaths,
        totalTimer,
        heartRateAvg,
        heartRateMin,
        heartRateMax,
    } = stat;

    //Basic field validation
    if (
        !playerKills ||
        !playerDeaths ||
        !totalTimer ||
        heartRateAvg == null ||
        heartRateMin == null ||
        heartRateMax == null
    ) {
        return res.status(400).json({ error: 'Missing one or more required fields' });
    }

    //Repalce previous, store only the new one
    playerStats = [stat];
    res.status(201).json({ message: 'Stats saved (replaced)', data: stat });
});

//GET /api/stats - retrieve stats
app.get('/api/stats', (req, res) => {
    res.json(playerStats);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
