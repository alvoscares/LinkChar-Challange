import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IconCaretLeftFilled, IconCaretRightFilled } from "@tabler/icons-react";

import { Card } from "./Card";
import useMovies from "../utils/hooks/useMovies";

export const SectionRowMovie = ({ movies = [], title, path }) => {
  const { loadingMovies } = useMovies();
  const rowRef = useRef(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-white text-lg font-semibold cursor-pointer">
          {title}
        </h1>
        <Link to={`${path}`}>
          <span className="text-[#606265] text-xs hover:text-sm duration-300 cursor-pointer">
            All Movies
          </span>
        </Link>
      </div>

      <div className="relative w-full ">
        <IconCaretLeftFilled
          className={`absolute top-[40%] -left-3.5 z-40 text-white bg-[#C4C4C4] rounded-full w-7 h-7 cursor-pointer border-2 border-major hover:scale-125 duration-300 ${
            !isMoved && "hidden"
          }`}
          width={10}
          height={10}
          stroke={1}
          onClick={() => handleClick("left")}
        />

        <div
          ref={rowRef}
          className="flex items-center gap-x-8 overflow-x-scroll scrollbar-hide w-full"
        >
          {loadingMovies
            ? Array.from({ length: 6 }, (_, index) => (
                <Card
                  key={index}
                  type={"section"}
                />
              ))
            : movies?.map((movie) => (
                <Card key={movie.id} movie={movie} type={"section"} />
              ))}
        </div>

        <IconCaretRightFilled
          className={`absolute top-[40%] -right-3.5 text-white bg-[#C4C4C4] rounded-full w-7 h-7 cursor-pointer border-2 border-major hover:scale-125 duration-300`}
          width={10}
          height={10}
          stroke={1}
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};
