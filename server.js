require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3001; // Port where the server will listen
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cors = require('cors');

// Allow requests from your frontend origin
app.use(cors({
  origin: 'http://localhost:3000'
}));


app.get('/apod', async (req, res) => {
    const apiKey = process.env.NASA_API_KEY;
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error fetching APOD data: ", error);
      res.status(500).send('Error fetching APOD data');
    }
  });
  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});