import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { LogInLayout } from "./layouts/LogInLayout";
import { Login } from "./pages/Login";
import { LoginWL } from "./pages/LoginWL";

import TransitionComponent from "./components/animations/Transitions";
import { MainLayout } from "./layouts/MainLayout";
import { Movies } from "./pages/Movies";
import { PopularMovies } from "./pages/PopularMovies";
import { Movie } from "./pages/Movie";
import { TvShows } from "./pages/TvShows";
import { Animations } from "./pages/Animations";
import { Plans } from "./pages/Plans";

import { AuthProvider } from "./context/AuthProvider";
import { MoviesProvider } from "./context/MoviesProvider";
import { TransitionProvider } from "./context/TransitionContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MoviesProvider>
          <TransitionProvider>
            <Routes>
              <Route path="/" element={<LogInLayout />}>
                <Route index element={<Login />} />
              </Route>

              <Route path="/" element={<MainLayout />}>
                <Route
                  index
                  path="movies"
                  element={
                    <TransitionComponent>
                      <Movies />
                    </TransitionComponent>
                  }
                />
                <Route
                  path="movies/popular"
                  element={
                    <TransitionComponent>
                      <PopularMovies />
                    </TransitionComponent>
                  }
                />
              </Route>

              <Route path="/" element={<MainLayout />}>
                <Route
                  index
                  path="tvshows"
                  element={
                    <TransitionComponent>
                      <TvShows />
                    </TransitionComponent>
                  }
                />
              </Route>

              <Route path="/" element={<MainLayout />}>
                <Route
                  index
                  path="animations"
                  element={
                    <TransitionComponent>
                      <Animations />
                    </TransitionComponent>
                  }
                />
              </Route>

              <Route path="/" element={<MainLayout />}>
                <Route
                  index
                  path="plans"
                  element={
                    <TransitionComponent>
                      <Plans />
                    </TransitionComponent>
                  }
                />
              </Route>

              <Route path="/" element={<MainLayout />}>
                <Route
                  index
                  path="movie/:id"
                  element={
                    <TransitionComponent>
                      <Movie />
                    </TransitionComponent>
                  }
                />
              </Route>
            </Routes>
          </TransitionProvider>
        </MoviesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

{
  /* <Route path="*" element={<Navigate to={"/"} />} /> */
}
