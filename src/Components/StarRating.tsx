import React, { useState } from "react";
import { FaStar } from "react-icons/fa"; // npm install react-icons
import './StarRating.css';

function StarRating({ rating, onRatingChange }) {
    const [hover, setHover] = useState(null);

    const handleRatingClick = (newRating) => {
        onRatingChange(newRating);
    };

    return (
        <div className="starRating">
            {[...Array(5)].map((_, index) => {
                const currentRating = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="starNumber"
                            value={currentRating}
                            onClick={() => handleRatingClick(currentRating)}
                        />
                        <FaStar
                            className="star"
                            size={30}
                            color={
                                currentRating <= (hover || rating)
                                    ? "gold"
                                    : "lightgrey"
                            }
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
            <p>Your rating is {rating}</p>
        </div>
    );
}

export default StarRating;

