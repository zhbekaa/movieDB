import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000' //localhost
})

const getActor = (id) => {
    return axiosClient.get(`/actors/${id}`)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            throw err
        })
}
export const actorService = {
    getActor: getActor
}