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

const getFeatured = (req, res) => {
    movies.getFeatured((err, movies) => {
        if (err) return res.sendStatus(404)
        return res.status(200).send(movies)
    }) 
}

const getBestRated = (req, res) => {
    movies.getBestRated((err, movies) => {
        if (err) return res.sendStatus(404)
        return res.status(200).send(movies)
    })
}
const getSingleMovie = (req, res) => {
    const movieId = req.params.id
    movies.getSingleMovie(movieId, (err, movie) => {

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
    search: search,
    genres: genres,
    getFeatured: getFeatured,
    getBestRated: getBestRated,
};