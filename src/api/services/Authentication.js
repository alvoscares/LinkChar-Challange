import TmdbClient from "../TmdbClient";

const getCreateRequestToken = async () => {
  return await TmdbClient(`/authentication/token/new`)
}

const postCreateSessionWL = async (username, password, request_token) => {
  return await TmdbClient.post(`/authentication/token/validate_with_login`, { username, password, request_token })
}

const postCreateSession = async (request_token) => {
  return await TmdbClient.post(`/authentication/session/new`, { request_token })
}

const deleteSession = async (session_id) => {
  const data = {
    session_id
  }
  return await TmdbClient.delete(`/authentication/session`, { data })
}

const getCreateGuestSession = async () => {
  return await TmdbClient(`/authentication/guest_session/new`)
}

export default { getCreateRequestToken, postCreateSessionWL, postCreateSession, deleteSession, getCreateGuestSession }

