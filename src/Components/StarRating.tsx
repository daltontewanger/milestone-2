import React, { useState } from "react";
import { FaStar } from "react-icons/fa"; // npm install react-icons
import './StarRating.css';

interface StarRatingProps {
    rating: number;
    onRatingChange: (newRating: number) => void;
}

const StarRating = ({ rating, onRatingChange }: StarRatingProps) => {
    const [hover, setHover] = useState<number | null>(null);

    const handleRatingClick = (newRating: number) => {
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

