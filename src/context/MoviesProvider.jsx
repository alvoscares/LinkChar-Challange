import { createContext } from "react";
import { useEffect, useState } from "react";

import useAuth from "../utils/hooks/useAuth";
import MovieListApi from "../api/services/MovieLists";
import MovieApi from "../api/services/Movie";
import AccountApi from "../api/services/Account";

const MoviesContext = createContext();

const MoviesProvider = ({ children }) => {
  const { details, sessionId } = useAuth();

  // Movie
  const [loadingMovie, setLoadingMovie] = useState(false);
  const [detailsMovie, setDetailsMovie] = useState({});
  // Movies
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [nowPlaying, setNowPlaying] = useState({});
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [favorites, setFavorites] = useState([]);
  // SideBar
  const [loadingSidebar, setLoadingSidebar] = useState(false);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      setLoadingSidebar(true);
      const data = await MovieListApi.getUpcoming();
      setUpcoming(data.results);
      setLoadingSidebar(false);
    };
    fetchUpcoming();
  }, []);

  const fetchNowPlaying = async () => {
    setNowPlaying({});
    setLoadingMovies(true);
    const data = await MovieListApi.getNowPlaying();
    setNowPlaying(data);
    setLoadingMovies(false);
  };

  const fetchPopular = async () => {
    setLoadingMovies(true);
    const data = await MovieListApi.getPopular();
    setPopular(data);
    setLoadingMovies(false);
  };

  const fetchTopRated = async () => {
    setLoadingMovies(true);
    const data = await MovieListApi.getTopRated();
    setTopRated(data);
    setLoadingMovies(false);
  };

  const fetchFavoriteMovies = async () => {
    setLoadingMovie(true);
    const data = await AccountApi.getFavoriteMovies(details.id, sessionId)
    setFavorites(data)
    setLoadingMovie(false)
  }

  const fetchDetails = async (id) => {
    setDetailsMovie({});
    setLoadingMovie(true);
    const data = await MovieApi.getDetails(id);
    setDetailsMovie(data);
    setLoadingMovie(false);
  };

  return (
    <MoviesContext.Provider
      value={{
        upcoming,
        loadingSidebar,
        nowPlaying,
        fetchNowPlaying,
        loadingMovies,
        fetchDetails,
        detailsMovie,
        loadingMovie,
        fetchPopular,
        popular,
        topRated,
        fetchTopRated,
        fetchFavoriteMovies,
        favorites
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export { MoviesProvider };

export default MoviesContext;
