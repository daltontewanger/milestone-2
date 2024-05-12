import { useState } from "react";
import { FaStar } from "react-icons/fa"; //npm install react-icons

function StarRating() {
    const [rating, setRating] = useState(null)
    

    return (
        <div className="starRating">
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return(
                    <label>
                        <input type="radio" name="starNumber" value={currentRating} onClick={() => setRating(currentRating)} />
                        <FaStar size={30} />
                    </label>
                );
            })}
        </div>
    )
}

export default StarRating