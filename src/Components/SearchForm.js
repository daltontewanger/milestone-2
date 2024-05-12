import React, { useState } from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import { Search } from '@mui/icons-material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const baseUrl = "https://movie-database-alternative.p.rapidapi.com/";
const apiKey = process.env.REACT_APP_API_KEY;

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null); // State to hold search results

  const fetchApiData = async (query) => {
    const url = `${baseUrl}?s=${encodeURIComponent(query)}&r=json`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setSearchResults(result); // Update state with search results
    } catch (error) {
      console.error(error);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   fetchApiData(query);
  // };

  return (
    <div>
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form> */}
      <Box display="flex" justifyContent="center">
        <TextField
          variant="outlined"
          placeholder="Search Movies"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') fetchApiData(query); }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {searchResults && searchResults.Search && (
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: '50px' }}>
            {searchResults.Search.map((movie, index) => (
              <Card key={index} sx={{ maxWidth: 200, marginBottom: '20px' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="280"
                    image={movie.Poster}
                    alt={movie.Title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {movie.Title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {movie.Year}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </div>
        </div>
      )}
      {/* </Box> */}
    </div>
  );
};

export default SearchForm;
