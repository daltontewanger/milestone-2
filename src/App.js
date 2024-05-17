import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Movie from './Components/Movie'
import MovieList from './Components/MovieList';
import NewReview from './Components/NewReview';
import ReviewsPage from './Components/ReviewsPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<MovieList />} />
          <Route path='/movie' element={<Movie />} />
          <Route path='/newreview' element={<NewReview />} />
          <Route path='/reviews' element={<ReviewsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
