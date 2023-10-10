import TmdbClient from "../TmdbClient";

const getUpcoming = async () => {
    const randomNumber = Math.floor(Math.random() * 15) + 1
    try {
        const { data } = await TmdbClient(`/movie/upcoming?page=${randomNumber}`)
        return data
    } catch (error) {
        return error
    }
}

const getNowPlaying = async () => {
    try {
        const randomNumberPage = Math.floor(Math.random() * 70) + 1
        const randomNumberMovie = Math.floor(Math.random() * 20)
        const { data } = await TmdbClient(`/movie/now_playing?page=${randomNumberPage}`)
        return data.results[randomNumberMovie]
    } catch (error) {
        return error
    }
}

const getPopular = async () => {
    try {
        const { data } = await TmdbClient(`/movie/popular?page=${"1"}`)
        return data.results
    } catch (error) {
        return error
    }
}

const getTopRated = async () => {
    try {
        const { data } = await TmdbClient(`/movie/top_rated?page=${"1"}`)
        return data.results
    } catch (error) {
        return error
    }
}

export default { getUpcoming, getNowPlaying, getPopular, getTopRated }