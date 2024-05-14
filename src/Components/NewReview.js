import React, { useState } from "react";
import StarRating from "./StarRating";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function NewReview() {
    const [currentRating, setCurrentRating] = useState(0);
    const [review, setReview] = useState("");
    const [error, setError] = useState(false);
    const [ratingError, setRatingError] = useState(false);
    const maxCharacters = 500;
    const minCharacters = 20;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (review.length < minCharacters || currentRating < 1) {
            setError(review.length < minCharacters);
            setRatingError(currentRating < 1);
            return;
        }
        console.log("Rating:", currentRating, "Review:", review);
        setCurrentRating(0);
        setReview("");
        setError(false);
        setRatingError(false);
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

    return (
        <div>
            <h3>Write a Review</h3>
            <StarRating rating={currentRating} onRatingChange={handleRatingChange} />
            {ratingError && <p style={{ color: 'red' }}>Please provide at least a 1-star rating.</p>}
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
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
                    maxLength={maxCharacters}
                />
                <div>
                    <p>{review.length}/{maxCharacters} characters</p> {/* Display character count */}
                </div>
                <div className="btn-group">
                    <button className="submit" type="submit" style={{backgroundColor: 'lightblue'}}>Submit</button>
                    <button className="cancel" type="button" onClick={handleCancel} style={{backgroundColor: 'red'}}>Cancel</button>
                </div>
            </Box>
        </div>
    );
}

export default NewReview;
