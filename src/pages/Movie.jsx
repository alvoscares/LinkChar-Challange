import { useEffect } from "react";
import { useParams } from "react-router-dom";

import useMovies from "../utils/hooks/useMovies";

export const Movie = () => {
  const { id } = useParams();
  const { fetchDetails, details, loadingMovie } = useMovies();

  useEffect(() => {
    fetchDetails(id);
  }, [id]);

  return (
    <div className="w-full h-full">
      <h1 className="text-white text-lg mb-5 font-semibold cursor-pointer">
        {details.title}
      </h1>
    </div>
  );
};
