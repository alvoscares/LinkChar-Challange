import TmdbClient from "../TmdbClient";

const getDetails = async (session_id) => {
    try {
        const { data } = await TmdbClient(`/account/account_id?session_id=${session_id}`)
        return data
    } catch (error) {
        return {
            susses: false,
            msg: error.response.data.status_message
        }
    }
}

export default { getDetails }

