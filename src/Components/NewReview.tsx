import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StarRating from "./StarRating.tsx";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid, Paper, Avatar, Button, Typography } from '@mui/material';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import Loading from './Loading.tsx';

const NewReview = () => {
    const navigate = useNavigate();
    const { imdbID } = useParams<{ imdbID: string }>();
    const [currentRating, setCurrentRating] = useState<number>(0);
    const [review, setReview] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [ratingError, setRatingError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const maxCharacters = 500;
    const minCharacters = 20;
    const maxRows = 15;

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (review.length < minCharacters || currentRating < 1) {
            setError(review.length < minCharacters);
            setRatingError(currentRating < 1);
            return;
        }
        setLoading(true);

        try {
            const response = await fetch('https://ms-2-project-backend.onrender.com/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    imdb: imdbID,
                    rating: currentRating,
                    review: review
                })
            });

            if (!response.ok) {
                throw new Error('Failed to submit review');
            }

            console.log("Review submitted successfully");

            setLoading(false);
            setCurrentRating(0);
            setReview("");
            setError(false);
            setRatingError(false);

            navigate(`/movie/${imdbID}`);
        } catch (error) {
            console.error("Error submitting review:", error);
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate(`/movie/${imdbID}`);
    };

    const handleRatingChange = (newRating: number) => {
        setCurrentRating(newRating);
        setRatingError(false);
    };

    const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const inputText = event.target.value;
        const lines = inputText.split('\n');
        if (lines.length <= maxRows && inputText.length <= maxCharacters) {
            setReview(inputText);
            if (inputText.length >= minCharacters) {
                setError(false);
            }
        } else if (lines.length > maxRows) {
            const truncatedText = lines.slice(0, maxRows).join('\n');
            setReview(truncatedText);
            setError(false);
        }
    };

    const avatarStyle = { backgroundColor: '#1976d2' };

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={10} md={8} lg={6}>
                    <Paper
                        style={{
                            padding: 20,
                            height: "auto",
                            maxWidth: '600px',
                            margin: '30px auto',
                            marginBottom: "1rem",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            wordBreak: "break-word",
                            overflow: "hidden",
                            position: "relative",
                        }}
                    >
                        <Grid container sx={{ flexDirection: 'column', alignItems: 'center' }}>
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
                                    maxRows={maxRows}
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
};

export default NewReview;