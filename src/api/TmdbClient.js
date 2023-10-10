import axios from "axios";

const TmdbClient = axios.create({
  baseURL: `${import.meta.env.VITE_TMDB_URL}`,
  headers: {
    accept: 'application/json',
    "content-type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  }
})

export default TmdbClient;