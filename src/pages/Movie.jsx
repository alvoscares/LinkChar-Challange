import { useEffect } from "react";
import { useParams } from "react-router-dom";

import useMovies from "../utils/hooks/useMovies";

export const Movie = () => {
  const { id } = useParams();
  const { fetchDetails, detailsMovie, loadingMovie } = useMovies();
  console.log(detailsMovie)
  useEffect(() => {
    fetchDetails(id);
  }, [id]);

  return (
    <div className="w-full h-full">
      <h1 className="text-white text-lg mb-5 font-semibold cursor-pointer">
        {detailsMovie.title}
      </h1>
    </div>
  );
};
