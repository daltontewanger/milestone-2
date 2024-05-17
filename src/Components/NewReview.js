import React, { useState, useEffect, useParams } from "react";
import StarRating from "./StarRating";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid, Paper, Avatar, Button, Typography } from '@mui/material';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import Loading from './Loading'; // Import the Loading component

function NewReview () {
    const { imdbID } = useParams();
    const [currentRating, setCurrentRating] = useState(0);
    const [review, setReview] = useState("");
    const [error, setError] = useState(false);
    const [ratingError, setRatingError] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state for initial load
    const maxCharacters = 500;
    const minCharacters = 20;


    useEffect(() => {
        // Simulate a data fetch or initialization
        setTimeout(() => {
            setLoading(false); // Set loading to false after initialization completes
        }, 2000); // Adjust the timeout as needed
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (review.length < minCharacters || currentRating < 1) {
            setError(review.length < minCharacters);
            setRatingError(currentRating < 1);
            return;
        }
        setLoading(true); // Set loading to true when submission starts

        // Simulate an async operation (e.g., API call)
        setTimeout(() => {
            console.log("Rating:", currentRating, "Review:", review);
            setLoading(false); // Set loading to false after the operation completes
            setCurrentRating(0);
            setReview("");
            setError(false);
            setRatingError(false);
        }, 2000); // Adjust the timeout as needed
    };

    const handleCancel = () => {
        setCurrentRating(0);
        setReview("");
        setError(false);
        setRatingError(false);
    };

    const handleRatingChange = (newRating) => {
        setCurrentRating(newRating);
        setRatingError(false);
    };

    const handleReviewChange = (event) => {
        const inputText = event.target.value;
        if (inputText.length <= maxCharacters) {
            setReview(inputText);
            if (inputText.length >= minCharacters) {
                setError(false);
            }
        }
    };

    const paperStyle = { padding: 20, height: 'auto', width: '100%', maxWidth: '600px', margin: '30px auto' };
    const avatarStyle = { backgroundColor: '#1976d2' };

    if (loading) {
        return <Loading />; // Display loading spinner while loading
    }

    return (
        <div>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={10} md={8} lg={6}>
                    <Paper elevation={10} style={paperStyle}>
                        <Grid align='center'>
                            <Avatar style={avatarStyle}>
                                <RateReviewRoundedIcon />
                            </Avatar>
                            <Typography variant="h5">Write a Review</Typography>
                            <StarRating rating={currentRating} onRatingChange={handleRatingChange} />
                            {ratingError && <Typography color="error">Please provide at least a 1-star rating.</Typography>}
                            <input type="hidden" name="imdbID" value={imdbID} />
                            <Box
                                component="form"
                                noValidate
                                autoComplete="off"
                                onSubmit={handleSubmit}
                                sx={{
                                    '& .MuiTextField-root': { m: 1 },
                                    width: '100%',
                                    mt: 2
                                }}
                            >
                                <TextField
                                    required
                                    error={error}
                                    helperText={error ? `Review must be at least ${minCharacters} characters` : ""}
                                    id="outlined-required"
                                    label="Required"
                                    name="review"
                                    value={review}
                                    onChange={handleReviewChange}
                                    placeholder="Write your review..."
                                    multiline
                                    minRows={5}
                                    maxRows={12}
                                    fullWidth
                                    variant="outlined"
                                />
                                <Typography>{review.length}/{maxCharacters} characters</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                    <Button type="button" onClick={handleCancel} sx={{ backgroundColor: 'red', color: 'white', px: 3 }} variant="contained">Cancel</Button>
                                    <Button type="submit" sx={{ backgroundColor: 'blue', color: 'white', px: 3 }} variant="contained">Submit</Button>
                                    
                                </Box>
                            </Box>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default NewReview;
