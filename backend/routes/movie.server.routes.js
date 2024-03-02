const movies = require('../controller/movies.server.controllers')


module.exports = function (app) {

    // Untested
    app.get('/movies')
        .get(movies.getMovies);  

    // not complete
    app.get('/movies/:id')
        .get(movies.getSingleMovie)

    // not compleye
    app.get('/search')
        .get(movies.searh) 

}