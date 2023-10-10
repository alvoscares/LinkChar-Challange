import useMovies from "../utils/hooks/useMovies";
import { Card } from "../components/Card";

export const PopularMovies = () => {
  const { loadingMovies, popular } = useMovies();

  return (
    <div className=" h-full w-full">
      <h1 className="text-white text-lg mb-5 font-semibold cursor-pointer">
        Popular Movies 2023
      </h1>
      <div className="h-full w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 auto-cols-auto gap-8">
      {loadingMovies
            ? Array.from({ length: 4 }, (_, index) => (
                <Card
                  key={index}
                  loading={true}
                  type="section"
                  height={"36"}
                />
              ))
            : popular?.map((movie) => (
                <Card key={movie.id} movie={movie} type="section" />
              ))}
      </div>
    </div>
  );
};

// grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4