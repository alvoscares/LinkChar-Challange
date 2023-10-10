import { createContext } from "react";
import { useEffect, useState } from "react";
import MovieListApi from "../api/services/MovieLists";
import MovieApi from "../api/services/Movie";

const MoviesContext = createContext();

const MoviesProvider = ({ children }) => {
  // Movie
  const [loadingMovie, setLoadingMovie] = useState(false);
  const [details, setDetails] = useState({});
  // Movies
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [nowPlaying, setNowPlaying] = useState({});
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
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
    setNowPlaying({})
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

  const fetchDetails = async (id) => {
    setDetails({})
    setLoadingMovie(true);
    const data = await MovieApi.getDetails(id);
    setDetails(data);
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
        details,
        loadingMovie,
        fetchPopular,
        popular,
        topRated,
        fetchTopRated
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export { MoviesProvider };

export default MoviesContext;
