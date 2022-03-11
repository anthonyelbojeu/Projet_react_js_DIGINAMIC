import * as axios from "axios";
import { Movie } from '../features/movies/models/movie';

export const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGRkMjg5YTEwYmY0OGMxYmFjYTg2ZWIyYmNiNGY2YyIsInN1YiI6IjYxNzFjMjBhYzhmODU4MDA5NGM0YmU4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1EcsKz4BLJKNbO-dH8ainDZjbvyYPxDSYtaBR4Hj2qU';

export const urlApiMovie = axios.create({
  baseURL: 'https://api.themoviedb.org/4',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  timeout: 4000
});

urlApiMovie.interceptors.request.use(req => {
  req.headers['Authorization'] = 'Bearer ' + API_TOKEN;
  return req;
});

export const mapMovies = movies => 
  movies.map(m => new Movie(
    m.id,
    m.title,
    'https://image.tmdb.org/t/p/w500' + m.poster_path,
    `${m.release_date} | ${m.vote_average}/10 (${m.vote_count})`,
    m.overview
  )
);