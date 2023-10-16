import { useEffect } from "react";

import useMovies from "../utils/hooks/useMovies";
import useAuth from "../utils/hooks/useAuth";
import { Card } from "../components/Card";
import { SectionRowMovie } from "../components/SectionRowMovie";

export const Movies = () => {
  localStorage.setItem('lastPath', '/movies');
  const {
    loadingMovies,
    fetchMoviesPage,
    nowPlaying,
    popular,
    topRated
  } = useMovies();

  const { details } = useAuth();

  useEffect(() => {
    fetchMoviesPage();
  }, []);

  return (
    <div className="flex flex-col items-start justify-around h-full w-full gap-y-7">
      <div className="hidden md:block w-full">
        {loadingMovies ? (
          <Card loading={true} height={"32"} type={"hero"} />
        ) : (
          <Card movie={nowPlaying[1]} height={"32"} hero={true} type={"hero"} />
        )}
      </div>

      {/* Continue Watching Section */}
      {/* <SectionRowMovie loading={loadingMovies} movies={favorites} title="Continue Watching" path="popular"/> */}

      {/* Popular Section */}
      <SectionRowMovie movies={popular} title="Popular Movies 2023" path="popular"/>

      {/* Top Rated Section */}
      <SectionRowMovie movies={topRated} title="Top Rated" path="toprated"/>
    </div>
  );
};
