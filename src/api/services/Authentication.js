import TmdbClient from "../TmdbClient";

const getCreateRequestToken = async () => {
  try {
    const { data } = await TmdbClient(`/authentication/token/new`)
    return data
  } catch (error) {
    return {
      susses: false,
      msg: error.response.data.status_message
    }
  }
}

const postCreateSessionWL = async (username, password, request_token) => {
  try {
    const { data } = await TmdbClient.post(`/authentication/token/validate_with_login`, { username, password, request_token })
    return data
  } catch (error) {
    return {
      susses: false,
      msg: error.response.data.status_message
    }
  }
}

const postCreateSession = async (request_token) => {
  try {
    const { data } = await TmdbClient.post(`/authentication/session/new`, { request_token })
    return data
  } catch (error) {
    return {
      susses: false,
      msg: error.response.data.status_message
    }
  }
}

const deleteSession = async (session_id) => {

  try {
    const { data } = await TmdbClient.delete(`/authentication/session`, { data: { session_id } })
    return data
  } catch (error) {
    return {
      susses: false,
      msg: error.response.data.status_message
    }
  }
}

const getCreateGuestSession = async () => {
  try {
    const { data } = await TmdbClient(`/authentication/guest_session/new`)
    return data
  } catch (error) {
    return {
      susses: false,
      msg: error.response.data.status_message
    }
  }
}

export default { getCreateRequestToken, postCreateSessionWL, postCreateSession, deleteSession, getCreateGuestSession }

