# JEDCV Movie Reviews

## Website Inspiration
#### We built a movie review site based on our love for movies! From romantic comedies to horror slashers, we love them all!

## How to use our site
#### Simply type a movie title into the homepage search bar and a movie list matching your search will display in the user interface. From there, selecting one of the movie results will navigate the user to the selected movie page. On the movie page, users will have the functionality to review movie details and reviews as well as add a movie review of their own. Users will also have the functionality to edit or delete their submitted movie reviews if needed. 

    Technologies Used (Citations)
    - Material UI (UI design)
    - React
    - Movie Database Alternative
      - https://rapidapi.com/rapidapi/api/movie-database-alternative
    - MongoDB
    - Express
    - Render (Deployment)

## This site utilizes a backend API
- [Click Here for the Back End](https://github.com/daltontewanger/ms-2-project-backend)

## Collaborators / Site Owners & Creators
```jsx
import React from 'react';

const Collaborators = () => {
  const collaborators = [
    "Courtney Rudd",
    "Jacob Bunnell",
    "Emily Ochoa",
    "Victor Estrada",
    "Dalton Tewanger"
  ];

  return (
    <div>
      <h2>Collaborators</h2>
      <ul>
        {collaborators.map((collaborator, index) => (
          <li key={index}>{collaborator}</li>
        ))}
      </ul>
    </div>
  );
}

export default Collaborators;
