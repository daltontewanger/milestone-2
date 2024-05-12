import { useState } from "react";
import { FaStar } from "react-icons/fa"; //npm install react-icons
import './StarRating.css';

function StarRating() {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return (
        <div className="starRating">
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return(
                    <label>
                        <input type="radio" 
                        name="starNumber" 
                        value={currentRating} 
                        onClick={() => setRating(currentRating)} />
                        <FaStar 
                        className='star' 
                        size={30} 
                        color={currentRating <= (hover || rating) ? "gold" : "lightgrey"}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
            <p>Your rating is {rating}</p>
        </div>
    )
}

export default StarRating