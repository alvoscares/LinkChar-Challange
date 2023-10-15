import TmdbClient from "../TmdbClient";

const getDetails = async (id) => {
    const params = {
        "append_to_response":"videos,images"
    }
    return await TmdbClient(`/movie/${id}`, {params})
}

export default { getDetails }