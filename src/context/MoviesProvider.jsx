import { createContext } from "react";
import { useEffect, useState } from "react";

import useAuth from "../utils/hooks/useAuth";
import MovieListApi from "../api/services/MovieLists";
import MovieApi from "../api/services/Movie";
import AccountApi from "../api/services/Account";
import GenresApi from "../api/services/Genres";

const MoviesContext = createContext();

const MoviesProvider = ({ children }) => {
  const { details, sessionId } = useAuth();

  // Movie
  const [loadingMovie, setLoadingMovie] = useState(false);
  const [detailsMovie, setDetailsMovie] = useState({});
  // Movies
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [loadingSideBar, setLoadingSideBar] = useState(false);
  const [upComing, setUpComing] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [favorites, setFavorites] = useState([]);
  // Genres
  const [genres, setGenres] = useState([]);

  const fetchUpcoming = async (page) => {
    setLoadingSideBar(true);
    try {
      const { data } = await MovieListApi.getUpcoming(page);
      setUpComing(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSideBar(false);
    }
  };

  const fetchNowPlaying = async () => {
    try {
      const { data } = await MovieListApi.getNowPlaying();
      setNowPlaying(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPopular = async () => {
    try {
      const { data } = await MovieListApi.getPopular();
      setPopular(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTopRated = async () => {
    try {
      const { data } = await MovieListApi.getTopRated();
      setTopRated(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFavoriteMovies = async () => {
    try {
      const { data } = await AccountApi.getFavoriteMovies(
        details.id,
        sessionId
      );
      setFavorites(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDetails = async (id) => {
    setDetailsMovie({});
    try {
      const { data } = await MovieApi.getDetails(id);
      setDetailsMovie(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMoviesPage = async () => {
    setLoadingMovies(true);
    const page = Math.floor(Math.random() * 15) + 1;
    try {
      const [nowPlaying, popular, topRated] = await Promise.all([
        MovieListApi.getNowPlaying(page),
        MovieListApi.getPopular(),
        MovieListApi.getTopRated(),
      ]);
      setNowPlaying(nowPlaying.data.results)
      setPopular(popular.data.results)
      setTopRated(topRated.data.results)
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMovies(false);
    }
  };

  const fetchGenres = async () => {
    try {
      const {data} = await GenresApi.getMovieList()
      setGenres(data.genres)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <MoviesContext.Provider
      value={{
        fetchUpcoming,
        upComing,
        loadingSideBar,
        nowPlaying,
        loadingMovies,
        fetchDetails,
        detailsMovie,
        loadingMovie,
        popular,
        topRated,
        fetchFavoriteMovies,
        favorites,
        fetchMoviesPage,
        genres
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export { MoviesProvider };

export default MoviesContext;
