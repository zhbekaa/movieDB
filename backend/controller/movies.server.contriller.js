const movies = require("../models/movies.server.models");


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

    return res.sendStatus(500)

}

const search = (req, res) => {

    return res.sendStatus(500)

}


module.exports = {
    getMovies: getMovies,
    getSingleMovie: getSingleMovie,
    search:search
};