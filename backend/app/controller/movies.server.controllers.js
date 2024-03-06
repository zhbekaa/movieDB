const movies = require("../model/movie.server.models");


const getMovies = (req, res) => {

    movies.getMovies(req.query.search,(err,movies) =>{
    
        if(err){
            return res.sendStatus(404)}
        else {
            return res.status(200).send(movies)
        }
    })

}

const getSingleMovie = (req, res) => {

    movies.getSingleMovie(req.params.id, (err,movie) => {

        if(movie){
            return res.status(200).send(movie)
        }
        else if(err){
            return res.sendStatus(404)
        }
        else {
            return res.status(200).send(movie)
        }

    })

}

const search = (req, res) => {

    return res.sendStatus(500)

}


module.exports = {
    getMovies: getMovies,
    getSingleMovie: getSingleMovie,
    search:search
};