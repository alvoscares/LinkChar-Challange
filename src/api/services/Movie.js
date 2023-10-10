import TmdbClient from "../TmdbClient";

const getDetails = async (id) => {
    try {
        const { data } = await TmdbClient(`/movie/${id}?append_to_response=videos,images`)
        return data
    } catch (error) {
        return error
    }
}

export default { getDetails }