const express = require('express'); // Import Express framework
const axios = require('axios'); // Import Axios for making HTTP requests
const cors = require('cors'); // Import CORS middleware
const jwt = require('jsonwebtoken'); // Import JWT for generating tokens

const app = express(); // Create an Express application
const PORT = process.env.PORT || 5000; // Define the port

app.use(cors()); // Enable CORS
app.use(express.json()); // Enable parsing of JSON bodies

// Generate JWT Token (Replace 'your-secret-key' with a secure key)
const generateToken = () => {
  return jwt.sign({}, 'your-secret-key', { expiresIn: '1h' });
};

// Route to fetch data from iTunes Search API
app.get('/api/search', async (req, res) => {
  const { term, media } = req.query; // Get search term and media type from query parameters

  try {
    // Make a request to the iTunes Search API
    const response = await axios.get('https://itunes.apple.com/search', {
      params: {
        term,
        media,
        limit: 20 // Limit the number of results
      }
    });

    // Map the results to extract relevant data
    const data = response.data.results.map(item => ({
      trackName: item.trackName,
      artistName: item.artistName,
      artworkUrl100: item.artworkUrl100,
      releaseDate: item.releaseDate
    }));

    res.json(data); // Send the mapped data as a response
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from iTunes API' }); // Handle errors
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
