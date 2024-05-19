import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Movie from "./Components/Movie";
import MovieList from "./Components/MovieList";
import NewReview from "./Components/NewReview";
import EditReview from "./Components/EditReview";
import DeleteReview from "./Components/DeleteReview";
import Footer from "./Components/Footer";

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
        <Footer />
      </Router>
    </div>
  );
}

export default App;