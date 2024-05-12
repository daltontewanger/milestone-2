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

import StarRating from "./StarRating"

function NewReview() {
    return (
        <div>
           <StarRating />
        </div>
    )
}

export default NewReview