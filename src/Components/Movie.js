import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Paper, Grid, Chip, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';

const baseUrl = "https://movie-database-alternative.p.rapidapi.com/";
const apiKey = process.env.REACT_APP_API_KEY;

const Movie = () => {
  const { imdbID } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState(null);
  const [reviews, setReviews] = useState([]);

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

    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://ms-2-project-backend.onrender.com/reviews/${imdbID}`
        );
        const result = await response.json();
        setReviews(result);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
    fetchMovieData();
  }, [imdbID]);

  const handleNewReview = () => {
    navigate(`/newreview/${imdbID}`);
  };

  const handleEditReview = (reviewID) => {
    navigate(`/editreview/${imdbID}/${reviewID}`);
  };

  const handleDeleteReview = (reviewID) => {
    navigate(`/deletereview/${imdbID}/${reviewID}`);
  };

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
            <img
              src={movieData.Poster}
              alt={movieData.Title}
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <div style={{ marginTop: "16px" }}>
              <Typography variant="subtitle1" gutterBottom>
                Genres:
              </Typography>
              {movieData.Genre.split(", ").map((genre, index) => (
                <Chip
                  key={index}
                  label={genre}
                  style={{ marginRight: "8px", marginBottom: "8px" }}
                />
              ))}
            </div>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" gutterBottom>
              {movieData.Year} | {movieData.Rated} | {movieData.Runtime}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              style={{ fontSize: "1.1rem", marginBottom: "16px" }}
            >
              {movieData.Plot}
            </Typography>
            <Typography variant="body1">
              <strong>Director:</strong> {movieData.Director}
            </Typography>
            <Typography variant="body1">
              <strong>Writer:</strong> {movieData.Writer}
            </Typography>
            <Typography variant="body1">
              <strong>Actors:</strong> {movieData.Actors}
            </Typography>
            <Typography variant="body1">
              <strong>Language:</strong> {movieData.Language}
            </Typography>
            <Typography variant="body1">
              <strong>Country:</strong> {movieData.Country}
            </Typography>
            <Typography variant="body1">
              <strong>Awards:</strong> {movieData.Awards}
            </Typography>
            <Typography variant="body1">
              <strong>IMDb Rating:</strong> {movieData.imdbRating}
            </Typography>
            <Typography variant="body1">
              <strong>IMDb Votes:</strong> {movieData.imdbVotes}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h2" gutterBottom>
        Reviews
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "16px" }}
          onClick={handleNewReview}
        >
          New Review
        </Button>
      </Typography>
      <Paper
        style={{
          backgroundColor: "#f5f5f5",
          padding: "16px",
          marginBottom: "24px",
        }}
      >
        <Grid container spacing={2}>
          {reviews.map((review, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper
                style={{
                  padding: "16px",
                  marginBottom: "16px",
                  cursor: "pointer",
                }}
              >
                <Typography variant="subtitle1" gutterBottom>
                  Rating: {review.rating} ⭐
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {review.review}
                </Typography>
                <EditIcon onClick={() => handleEditReview(review._id)} color='primary' ></EditIcon>
                <DeleteIcon onClick={() => handleDeleteReview(review._id)} sx={{ color: red[900] }}></DeleteIcon>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
};

export default Movie;
