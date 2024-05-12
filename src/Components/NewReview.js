// import React from "react";
// import { useState } from "react";

// function NewReview() {

//     return (
//         <div>
//             <head>
//             <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
//             </head>
//             <h3>Write a Review</h3>
//             <form>
//                 <div className="starRatings">
//                     <input type="number" name="rating" id="starRating"></input>
//                     <i class='bx bx-star'></i>
//                     <i class='bx bx-star'></i>
//                     <i class='bx bx-star'></i>
//                     <i class='bx bx-star'></i>
//                     <i class='bx bx-star'></i>
//                 </div>
//                 <textarea name="review" placeholder="Write your review..."></textarea>
//                 <div class="btn-group">
//                     <button className="submit" type="submit">Submit</button>
//                     <button className="cancel">Cancel</button>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default NewReview

import { StarRating } from "./StarRating";

function NewReview() {
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents the default form submission behavior
    
        // Collect form data
        const formData = {
            formRating: rating,
            review: reviewText.trim() // Use the state variable directly for review text
        };
        console.log("Review:", formData);
        event.target.reset();
    };

    const handleCancel = () => {
        setReviewText('');
        setRating(null); // Reset the rating as well
    };

    return (
        <div>
            <h3>Write a Review</h3>
            <StarRating onChange={(newRating) => setRating(newRating)} />
            <form onSubmit={handleSubmit}>
                <textarea 
                    name="review" 
                    value={reviewText} 
                    onChange={(e) => setReviewText(e.target.value)} 
                    placeholder="Write your review..."
                ></textarea>
                <div className="btn-group">
                    <button className="submit" type="submit">Submit</button>
                    <button className="cancel" type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default NewReview;



//add character length and impove the review area