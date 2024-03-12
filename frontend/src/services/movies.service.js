import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000' //localhost
})

const getMovies = (input) => {
  return axiosClient
    .get(`movies?search=${input}`, { timeout: 3000 })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      throw err
    })
}

const getFeaturedMovies = () => {
  return axiosClient
    .get(`movies/featured`)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      throw err
    })
}


const getBestRatedMovies = () => {
  return axiosClient
    .get(`movies/best-rated`)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      throw err
    })
}

const getGenres = () => {
  return axiosClient
    .get('genres')
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      throw err
    })
}
export const moviesService = {
  getMovies,
  getGenres,
  getFeaturedMovies,
  getBestRatedMovies
}
