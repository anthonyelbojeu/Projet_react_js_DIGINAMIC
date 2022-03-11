import { Component } from "react";
import { Header, Loading } from "./components";
import { mapMovies, urlApiMovie } from './conf/api.movie';
import { MovieDetails, MovieList, SearchBar } from "./features/movies/components";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

const One =() => <h1> One</h1>
const Two =() => <h1> Two</h1>
const Three =() => <h1> Three</h1>

class App extends Component {
  constructor(props) {
    super(props);
    selected: null
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    urlApiMovie.get('/discover/movie')
      .then(res => res.data.results)
      .catch(console.error)
      .then(movies => {
        if (!movies && !movies.length) {
          throw new Error('No movies!');
        }
        movies = mapMovies(movies);
        this.setState({ movies });
      })
      .catch(console.error);
  }

  updateSelected = (idMovie) => {
    const movie = this.state.movies.find(m => m._id === idMovie);
    this.setState({ selected: movie });
  }

  render() {
    return (
      <div className="App">
      <Router>
          <Link to="/one"> One</Link>
          <Link to="/two"> Two</Link>
          <Link to="/two/three"> Three</Link>
          <Switch>
            <Route path="/:idUser" component={One} />
            <Route path="/:idMovie" component={One} />
            <Route path="/two" component={Two} />
            <Route path="/two/three" render={() => <Two />} />
          </Switch>
      </Router>
      </div>
    );
  }
}

// fetch('https://api.themoviedb.org/3/discover/movie?api_key=27d9429f794e96750e702e3f5507a88a')
//.then(res => res.json())
//.then((data)=> {
//  console.log(data)
//  const listNewMovies = data.results.map(movie => {
//  const id  = {_id : movie.id}
//  const url  = {img : movie.backdrop_path}
//  const desc = {details : movie.overview}
//  })
//  this.setState({
//   movies : data.results
//  })
//})


export default App;