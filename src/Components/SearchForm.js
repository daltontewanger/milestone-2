import React, { useState } from 'react';
import { TextField, InputAdornment, Box, CircularProgress } from '@mui/material';
import { Search } from '@mui/icons-material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

const baseUrl = "https://movie-database-alternative.p.rapidapi.com/";
const apiKey = process.env.REACT_APP_API_KEY;

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null); // State to hold search results
  const [loading, setLoading] = useState(false);

  const fetchApiData = async (query) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <Box display="flex" justifyContent="center" mb={2}>
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
      {loading && <Box display="flex" justifyContent="center"><CircularProgress /></Box>}
      {searchResults && searchResults.Search && (
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '50px', paddingLeft: '80px' }}>
            {searchResults.Search.map((movie, index) => (
              <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} style={{ textDecoration: 'none', width: 'calc(100% / 6)', marginBottom: '20px' }}>
                <Card sx={{ maxWidth: 200 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="280"
                      image={movie.Poster}
                      alt={movie.Title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div" sx={{ height: '60px', overflow: 'hidden' }}>
                        {movie.Title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {movie.Year}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
