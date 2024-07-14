import Navbar from "./Components/Navbar.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Movie from "./Components/Movie.tsx";
import MovieList from "./Components/MovieList.tsx";
import NewReview from "./Components/NewReview.tsx";
import EditReview from "./Components/EditReview.tsx";
import DeleteReview from "./Components/DeleteReview.tsx";
import Footer from "./Components/Footer.tsx";
import React from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:imdbID" element={<Movie />} />
          <Route path="/newreview/:imdbID" element={<NewReview />} />
          <Route path="/editreview/:imdbID/:reviewID" element={<EditReview />} />
          <Route path="/deletereview/:imdbID/:reviewID" element={<DeleteReview />} />
        </Routes>
        <Footer isMainPage={undefined} />
      </Router>
    </div>
  );
}

export default App;