import TmdbClient from "../TmdbClient";

const getDetails = async (session_id) => {
    const params = {
        session_id
    }
    return await TmdbClient(`/account/account_id`, { params })
}

const getFavoriteMovies = async (id, session_id) => {
    const params = {
        session_id
    }
    return await TmdbClient(`https://api.themoviedb.org/3/account/${id}/favorite/movies`, { params })
}

export default { getDetails, getFavoriteMovies }

