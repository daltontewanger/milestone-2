import React, { useState } from 'react';
import { TextField, InputAdornment, Box, CircularProgress, Grid } from '@mui/material';
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
  const [error, setError] = useState(false);

  const fetchApiData = async (query) => {
    setLoading(true);
    setError(false);
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
      if (result && result.Search && result.Search.length > 0) {
        setSearchResults(result);
      } else {
        setSearchResults(null);
        setError(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
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
      {error && (
        <Typography variant="body1" align="center" fontWeight="bold">
          Lame! Pick a movie that actually exists!
        </Typography>
      )}
      {searchResults && searchResults.Search && (
        <Box display="flex" justifyContent="center">
          <Grid container spacing={2} style={{ margin: '30px auto', maxWidth: '1400px' }}>
            {searchResults.Search.map((movie, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={movie.imdbID}>
                <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} style={{ textDecoration: 'none', width: 'calc(100% / 6)', marginBottom: '20px' }} >
                  <Card >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="350"
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
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default SearchForm;
