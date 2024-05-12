import React, { useState } from "react";
import StarRating from "./StarRating";

function NewReview() {
    const [currentRating, setCurrentRating] = useState(0);
    const [review, setReview] = useState("");
    const maxCharacters = 500;

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Rating:", currentRating, "Review:", review);
        setCurrentRating(0);
        setReview("");
    };

    const handleCancel = () => {
        setCurrentRating(0);
        setReview("");
    };

    const handleRatingChange = (newRating) => {
        setCurrentRating(newRating);
    };

    const handleReviewChange = (event) => {
        const inputText = event.target.value;
        if (inputText.length <= maxCharacters) { // Check if input text length is within limit
            setReview(inputText);
        }
    };

    return (
        <div>
            <h3>Write a Review</h3>
            <StarRating rating={currentRating} onRatingChange={handleRatingChange} />
            <form>
                <textarea 
                    name="review" 
                    value={review} 
                    onChange={handleReviewChange} 
                    placeholder="Write your review..."
                    maxLength={maxCharacters} // Set max length attribute
                ></textarea>
                <div>
                    <p>{review.length}/{maxCharacters} characters</p> {/* Display character count */}
                </div>
                <div className="btn-group">
                    <button className="submit" type="submit" onClick={handleSubmit} style={{backgroundColor: 'lightblue'}}>Submit</button>
                    <button className="cancel" onClick={handleCancel} style={{backgroundColor: 'red'}}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default NewReview;