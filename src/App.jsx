import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { LogInLayout } from "./layouts/LogInLayout";
import { Login } from "./pages/Login";
import { LoginWL } from "./pages/LoginWL";

import { MainLayout } from "./layouts/MainLayout";
import { Movies } from "./pages/Movies";
import { PopularMovies } from "./pages/PopularMovies";
import { Movie } from "./pages/Movie";
import { TvShows } from "./pages/TvShows";
import { Animations } from "./pages/Animations";
import { Plans } from "./pages/Plans";

import { AuthProvider } from "./context/AuthProvider";
import { MoviesProvider } from "./context/MoviesProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MoviesProvider>
          <Routes>
            <Route path="/" element={<LogInLayout />}>
              <Route index element={<Login />} />
            </Route>

            <Route path="/" element={<MainLayout />}>
              <Route index path="movies" element={<Movies />} />
              <Route path="movies/popular" element={<PopularMovies />} />
            </Route>

            <Route path="/" element={<MainLayout />}>
              <Route index path="tvshows" element={<TvShows />} />
            </Route>

            <Route path="/" element={<MainLayout />}>
              <Route index path="animations" element={<Animations />} />
            </Route>

            <Route path="/" element={<MainLayout />}>
              <Route index path="plans" element={<Plans />} />
            </Route>

            <Route path="/" element={<MainLayout />}>
              <Route index path="movie/:id" element={<Movie />} />
            </Route>
          </Routes>
        </MoviesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

{
  /* <Route path="*" element={<Navigate to={"/"} />} /> */
}
