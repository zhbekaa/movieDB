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
            return res.status(500).send("something went wrong")
        }

    })

}

const search = (req, res) => {

    console.log("ran#412")
    movies.search(req.query, (err,results) => {

        if(results){
            return res.status(200).send(results)
        }
        else if(err){
            return res.sendStatus(404)
        }
        else {
            return res.status(500).send("yeah idk")
        }

    })


}

const genres = (req, res) => {

    movies.genres((err,genres) => {

        if(genres){
            return res.status(200).send(genres)
        }
        else if(err){
            return res.sendStatus(404)
        }
        else {
            return res.sendStatus(500)
        }

    })

}


module.exports = {
    getMovies: getMovies,
    getSingleMovie: getSingleMovie,
    search:search,
    genres:genres
};