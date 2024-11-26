import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [term, setTerm] = useState('');
  const [media, setMedia] = useState('all');
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const search = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/search', {
        params: { term, media }
      });

      setResults(response.data);
    } catch (error) {
      console.error('Error fetching data from API', error);
    }
  };

  const addToFavorites = (item) => {
    setFavorites([...favorites, item]);
  };

  const removeFromFavorites = (item) => {
    setFavorites(favorites.filter(fav => fav.trackName !== item.trackName));
  };

  return (
    <div className="App">
      <h1>iTunes Search App</h1>
      <div className="search">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search term"
        />
        <select value={media} onChange={(e) => setMedia(e.target.value)}>
          <option value="all">All</option>
          <option value="movie">Movie</option>
          <option value="podcast">Podcast</option>
          <option value="music">Music</option>
          <option value="audiobook">Audiobook</option>
          <option value="shortFilm">Short Film</option>
          <option value="tvShow">TV Show</option>
          <option value="software">Software</option>
          <option value="ebook">Ebook</option>
        </select>
        <button onClick={search}>Search</button>
      </div>
      <div className="results">
        <h2>Results</h2>
        <ul>
          {results.map((item, index) => (
            <li key={index}>
              <img src={item.artworkUrl100} alt={item.trackName} />
              <p>{item.trackName} by {item.artistName}</p>
              <button onClick={() => addToFavorites(item)}>Add to Favorites</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="favorites">
        <h2>Favorites</h2>
        <ul>
          {favorites.map((item, index) => (
            <li key={index}>
              <img src={item.artworkUrl100} alt={item.trackName} />
              <p>{item.trackName} by {item.artistName}</p>
              <button onClick={() => removeFromFavorites(item)}>Remove from Favorites</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
