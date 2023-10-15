import TmdbClient from "../TmdbClient";

const getMovieList = async () => {
    return await TmdbClient(`/genre/movie/list`)
}

export default { getMovieList }