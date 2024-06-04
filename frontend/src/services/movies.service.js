import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000' //localhost
})

const getSearch = (params) => {
  console.log(params)
  return axiosClient
    .get(`search`, { params: params, timeout: 3000 })
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

const getSingleMovie = (id) => {
  return axiosClient
    .get(`movies/${id}`)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      throw err
    })
}

export const moviesService = {
  getSearch,
  getGenres,
  getFeaturedMovies,
  getBestRatedMovies,
  getSingleMovie,
}
