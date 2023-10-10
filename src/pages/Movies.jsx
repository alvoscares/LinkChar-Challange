import { useEffect } from "react";

import useMovies from "../utils/hooks/useMovies";
import useAuth from "../utils/hooks/useAuth";
import { Card } from "../components/Card";
import { SectionRowMovie } from "../components/SectionRowMovie";

export const Movies = () => {
  const {
    fetchNowPlaying,
    nowPlaying,
    loadingMovies,
    fetchPopular,
    popular,
    topRated,
    fetchTopRated,
    fetchFavoriteMovies,
    favorites
  } = useMovies();

  const { details } = useAuth();

  useEffect(() => {
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
    if(!!Object.keys(details).length){
      fetchFavoriteMovies()
    }
  }, []);

  return (
    <div className="flex flex-col items-start justify-around h-full w-full gap-y-7">
      <div className="hidden md:block w-full">
        {loadingMovies ? (
          <Card loading={true} height={"32"} type={"hero"} />
        ) : (
          <Card movie={nowPlaying} height={"32"} hero={true} type={"hero"} />
        )}
      </div>

      {/* Continue Watching Section */}
      {/* <SectionRowMovie loading={loadingMovies} movies={favorites} title="Continue Watching" path="popular"/> */}

      {/* Popular Section */}
      <SectionRowMovie loading={loadingMovies} movies={popular} title="Popular Movies 2023" path="popular"/>

      {/* Top Rated Section */}
      <SectionRowMovie loading={loadingMovies} movies={topRated} title="Top Rated" path="toprated"/>
    </div>
  );
};
