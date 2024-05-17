import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Movie from "./Components/Movie";
import MovieList from "./Components/MovieList";
import NewReview from "./Components/NewReview";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:imdbID" element={<Movie />} />
          <Route path="/newreview/:imdbID" element={<NewReview />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
