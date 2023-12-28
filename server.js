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

app.get('/marsimages', async (req, res) => {
    const apiKey = process.env.NASA_API_KEY;
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`;
  

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
      } catch (error) {
        console.error("Error fetching Mars rover photos: ", error);
        res.status(500).send('Error fetching Mars photos data');
      }

});
  

app.get('/neows', async (req, res) => {
    const apiKey = process.env.NASA_API_KEY;
    const startDate = new Date().toISOString().slice(0, 10); // get today's date in YYYY-MM-DD format
    const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&api_key=${apiKey}`;

  

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
      } catch (error) {
        console.error("Error fetching NEO data: ", error);
        res.status(500).send('Error fetching NEO data');
      }

});

app.get('/donki', async (req, res) => {
    const apiKey = process.env.NASA_API_KEY;
    const endDate = new Date().toISOString().slice(0, 10); // Today's date in YYYY-MM-DD
    const startDate = new Date(new Date().setDate(new Date().getDate()-30)).toISOString().slice(0, 10); // 30 days ago
    const apiUrl = `https://api.nasa.gov/DONKI/notifications?startDate=${startDate}&endDate=${endDate}&api_key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
      } catch (error) {
        console.error("Error fetching solar event data: ", error);
        res.status(500).send('Error fetching solar event data');
      }

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});