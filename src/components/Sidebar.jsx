import { useState, useEffect, useRef } from "react";
import { IconCaretLeftFilled } from "@tabler/icons-react";

import useMovies from "../utils/hooks/useMovies";
import useAuth from "../utils/hooks/useAuth";
import { Card } from "./Card";

export const Sidebar = () => {
  const { upcoming, loadingSidebar } = useMovies();
  const { details } = useAuth();

  const isLogin = !!Object.keys(details).length;

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`${
        isOpen ? "w-72 lg:w-96" : "w-16"
      } md:flex flex-col bg-major relative duration-300 border-r border-r-lightGrey hidden h-full`}
    >
      <IconCaretLeftFilled
        className={`absolute top-20 -right-3.5 text-white bg-[#C4C4C4] rounded-full w-7 h-7 cursor-pointer border-2 border-major hover:scale-125 duration-300 ${
          !isOpen && "rotate-180"
        }`}
        width={10}
        height={10}
        stroke={1}
        onClick={() => setIsOpen(!isOpen)}
      />
      <div
        className={`${
          isLogin ? "h-2/3" : "h-[95%]"
        }   flex flex-col gap-y-2 px-11 pt-7`}
      >
        <div
          className={`${
            !isOpen && "origin-left scale-0"
          } duration-200 flex items-start justify-between `}
        >
          <h1 className="text-white text-lg font-semibold">New trailers</h1>
          <div>
            <span className="text-[#606265] text-xs">Sort By</span>
          </div>
        </div>

        <div
          className={`${
            !isOpen && "hidden"
          } duration-300 overflow-y-auto h-full scrollbar-hide relative`}
        >
          <div className="absolute inset-0 w-full">
            <div className="flex flex-col gap-5 ">
              {loadingSidebar
                ? Array.from({ length: 4 }, (_, index) => (
                    <Card
                      key={index}
                      loading={true}
                      type={"normal"}
                      height={"36"}
                    />
                  ))
                : upcoming?.map((movie) => (
                    <Card key={movie.id} movie={movie} type={"normal"} />
                  ))}
            </div>
          </div>
        </div>
      </div>
      {isLogin && (
        <div
          className={`flex-1 bg-secondary w-full px-11 pb-7 ${
            !isOpen && "origin-left scale-0"
          }`}
        >
          <div className={``}>
            <h1 className="text-white text-lg font-semibold pt-5">
              Favourite genres
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};
