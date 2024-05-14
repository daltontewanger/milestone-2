import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid, Paper, Avatar, Button } from '@mui/material';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import Loading from './Loading';

function NewReview() {
    const [currentRating, setCurrentRating] = useState(0);
    const [review, setReview] = useState("");
    const [error, setError] = useState(false);
    const [ratingError, setRatingError] = useState(false);
    const [loading, setLoading] = useState(true);
    const maxCharacters = 500;
    const minCharacters = 20;

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (review.length < minCharacters || currentRating < 1) {
            setError(review.length < minCharacters);
            setRatingError(currentRating < 1);
            return;
        }
        setLoading(true);

        setTimeout(() => {
            console.log("Rating:", currentRating, "Review:", review);
            setLoading(false);
            setCurrentRating(0);
            setReview("");
            setError(false);
            setRatingError(false);
        }, 2000);
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

    const paperStyle = { padding: 20, height: 'auto', width: '70vh', margin: '30px auto' };
    const avatarStyle = { backgroundColor: 'blue' };

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}>
                            <RateReviewRoundedIcon />
                        </Avatar>
                        <h2>Write a Review</h2>
                        <StarRating rating={currentRating} onRatingChange={handleRatingChange} />
                        {ratingError && <p style={{ color: 'red' }}>Please provide at least a 1-star rating.</p>}
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '60ch' },
                            }}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit}
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
                            <div>
                                <p>{review.length}/{maxCharacters} characters</p>
                            </div>
                            <div className="btn-group">
                                <Button className="submit" type="submit" style={{ backgroundColor: 'blue', color: 'white', padding: 10, margin: 10 }}>Submit</Button>
                                <Button className="cancel" type="button" onClick={handleCancel} style={{ backgroundColor: 'red', color: 'white', padding: 10, margin: 10 }}>Cancel</Button>
                            </div>
                        </Box>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}

export default NewReview;
