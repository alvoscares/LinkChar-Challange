import { useState } from "react";
import { Link } from "react-router-dom";
import { IconStarFilled } from "@tabler/icons-react";

import { useImageUrl } from "../utils/hooks/useImgUrl";
import noImag from "../assets/images/placeholder.svg";
import useMovies from "../utils/hooks/useMovies";

export const Card = ({
  movie = {},
  height = "36",
  width = "full",
  type = "",
}) => {
  const { loadingMovies } = useMovies();
  const { backdrop_path, id, overview, title, vote_average } = movie;
  const imgUrl = useImageUrl(backdrop_path);

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Link to={`/movie/${id}`}>
      <div
        className={`${
          loadingMovies
            ? "bg-secondary animate-pulse  rounded-3xl h-36 w-36"
            : "group relative items-center justify-center   rounded-3xl overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-black/30 transition-shadow h-36 m-auto"
        } ${type === "section" ? "w-64 max-w-[16rem]" : "w-full"}`}
      >
        <img
          className="h-full w-full object-cover group-hover:scale-125 transition-transform duration-300"
          src={imageError ? noImag : imgUrl}
          alt={title}
          onError={handleImageError}
        />

        {!loadingMovies && (
          <img
            className="h-full w-full object-cover group-hover:scale-125 transition-transform duration-300"
            src={imageError ? noImag : imgUrl}
            alt={title}
            onError={handleImageError}
          />
        )}
        {!loadingMovies && (
          <>
            <div
              className={`${
                type !== "hero" && " from-transparent via-transparent to-black"
              } bg-gradient-to-b absolute inset-0  group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70`}
            />
            {type !== "hero" ? (
              <div className="absolute inset-0  flex flex-col gap-4 items-start justify-start px-5 py-3 text-start translate-y-[70%] group-hover:translate-y-0 transition-all bg-gray-100/20 rounded-t-xl duration-300">
                <div className="flex items-center justify-between w-full">
                  <h1 className="text-sm font-bold text-white line-clamp-1 group-hover:line-clamp-none">
                    {title}
                  </h1>
                  <div className="flex items-center gap-x-2 text-white border-l border-l-white pl-5">
                    <IconStarFilled className="w-4 h-4" />
                    <span>{vote_average}</span>
                  </div>
                </div>
                <p className="text-xs italic text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-5">
                  {overview}
                </p>
              </div>
            ) : (
              <h1 className="absolute top-1/2 right-0 px-10 text-5xl font-axiforma-bold text-white group-hover:text-6xl duration-300 line-clamp-1">
                {title}
              </h1>
            )}
          </>
        )}
      </div>
    </Link>
  );
};
