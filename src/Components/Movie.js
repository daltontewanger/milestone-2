import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  IconButton,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";

const baseUrl = "https://movie-database-alternative.p.rapidapi.com/";
const apiKey = process.env.REACT_APP_API_KEY;

const Movie = () => {
  const { imdbID } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showFullReview, setShowFullReview] = useState({});

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

  const toggleFullReview = (index) => {
    setShowFullReview((prevState) => {
      const newState = { ...prevState };
      newState[index] = !newState[index];
      return newState;
    });
  };

  if (!movieData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <Typography
        variant="h2"
        gutterBottom
        sx={{
          fontSize: {
            xs: "2rem",
            sm: "4rem",
            md: "4rem",
            lg: "4rem",
          },
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {movieData.Title}
      </Typography>
      <Paper style={{ padding: "1rem", marginBottom: "1.5rem" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <img
              src={movieData.Poster}
              alt={movieData.Title}
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <div style={{ marginTop: "1rem" }}>
              <Typography variant="subtitle1" gutterBottom>
                Genres:
              </Typography>
              {movieData.Genre.split(", ").map((genre, index) => (
                <Chip
                  key={index}
                  label={genre}
                  style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }}
                />
              ))}
            </div>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h5" gutterBottom>
              {movieData.Year} | {movieData.Rated} | {movieData.Runtime}
            </Typography>
            <hr style={{ margin: "1rem 0" }} />
            <Typography
              variant="body1"
              gutterBottom
              style={{ fontSize: "1.1rem", marginBottom: "1rem" }}
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

      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontSize: {
            xs: "2rem",
            sm: "3rem",
            md: "3rem",
            lg: "3rem",
          },
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        Reviews
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "1rem" }}
          onClick={handleNewReview}
        >
          New Review
        </Button>
      </Typography>
      <Paper
        style={{
          backgroundColor: "#f5f5f5",
          padding: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <Grid container spacing={2}>
          {reviews.length === 0 && (
            <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Be the first to review this movie on our site!
              </Typography>
            </Grid>
          )}
          {reviews.map((review, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper
                style={{
                  padding: "0.5rem",
                  marginBottom: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  wordBreak: "break-word",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div style={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Rating: {review.rating} ⭐
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {showFullReview[index]
                      ? review.review
                      : review.review.length > 100
                      ? `${review.review.substring(0, 100)}...`
                      : review.review}
                  </Typography>
                </div>
                {review.review.length > 100 && !showFullReview[index] && (
                  <IconButton
                    onClick={() => toggleFullReview(index)}
                    size="small"
                    aria-label="show more"
                    style={{
                      position: "absolute",
                      bottom: "0.5rem",
                      right: "0.5rem",
                      zIndex: 1,
                    }}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                ></div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <EditIcon
                    onClick={() => handleEditReview(review._id)}
                    color="primary"
                    sx={{ marginRight: "0.5rem", cursor: "pointer" }}
                  />
                  <DeleteIcon
                    onClick={() => handleDeleteReview(review._id)}
                    sx={{ color: red[900], cursor: "pointer" }}
                  />
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
};

export default Movie;
