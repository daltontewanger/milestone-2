import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import MovieList from './Components/MovieList';
import Movie from './Components/Movie';
import NewReview from './Components/NewReview';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/newreview" element={<NewReview />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
