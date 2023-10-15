import TmdbClient from "../TmdbClient";

const getUpcoming = async (page) => {
    const params = {
        page
    }
    return await TmdbClient(`/movie/upcoming`, { params })
}

const getNowPlaying = async (page = 1) => {
    const params = {
        page
    }
    return await TmdbClient(`/movie/now_playing`, { params })
}

const getPopular = async (page = 1) => {
    const params = {
        page
    }
    return await TmdbClient(`/movie/popular`, { params })
}

const getTopRated = async (page = 1) => {
    const params = {
        page
    }
    return await TmdbClient(`/movie/top_rated`, { params })
}

export default { getUpcoming, getNowPlaying, getPopular, getTopRated }