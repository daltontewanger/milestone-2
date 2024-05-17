import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Paper, Grid, Chip } from "@mui/material";

const baseUrl = "https://movie-database-alternative.p.rapidapi.com/";
const apiKey = process.env.REACT_APP_API_KEY;

const Movie = () => {
  const { imdbID } = useParams();
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!imdbID) {
        return;
      }
      const url = `${baseUrl}?r=json&i=${imdbID}`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setMovieData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieData();
  }, [imdbID]);

  if (!movieData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "16px" }}>
      <Typography variant="h1" gutterBottom>
        {movieData.Title}
      </Typography>
      <Paper style={{ padding: "16px", marginBottom: "24px" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <img src={movieData.Poster} alt={movieData.Title} style={{ maxWidth: "100%", height: "auto" }} />
            <div style={{ marginTop: "16px" }}>
              <Typography variant="subtitle1" gutterBottom>
                Genres:
              </Typography>
              {movieData.Genre.split(", ").map((genre, index) => (
                <Chip key={index} label={genre} style={{ marginRight: "8px", marginBottom: "8px" }} />
              ))}
            </div>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" gutterBottom>
              {movieData.Year} | {movieData.Rated} | {movieData.Runtime}
            </Typography>
            <Typography variant="body1" gutterBottom style={{ fontSize: "1.1rem", marginBottom: "16px" }}>
              {movieData.Plot}
            </Typography>
            <Typography variant="body1"><strong>Director:</strong> {movieData.Director}</Typography>
            <Typography variant="body1"><strong>Writer:</strong> {movieData.Writer}</Typography>
            <Typography variant="body1"><strong>Actors:</strong> {movieData.Actors}</Typography>
            <Typography variant="body1"><strong>Language:</strong> {movieData.Language}</Typography>
            <Typography variant="body1"><strong>Country:</strong> {movieData.Country}</Typography>
            <Typography variant="body1"><strong>Awards:</strong> {movieData.Awards}</Typography>
            <Typography variant="body1"><strong>IMDb Rating:</strong> {movieData.imdbRating}</Typography>
            <Typography variant="body1"><strong>IMDb Votes:</strong> {movieData.imdbVotes}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Movie;
