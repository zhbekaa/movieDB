const express = require("express");
const app = express();

const movies = require('../controller/movies.server.controllers')


module.exports = function (app) {

    // Tested - Not to API spec. (Api spec is asking for less - Do you wish for me to change it?)
    app.route('/movies')
        .get(movies.getMovies)
    app.route('/movies/featured')
        .get(movies.getFeatured)    
    app.route('/movies/best-rated')
        .get(movies.getFeatured)

    // Minor Implementation - Not to API spec. (Api spec is complicated and is taking time to find a suitable SQL query to meet the requirements)
    app.route('/movies/:id')
        .get(movies.getSingleMovie)

    // Caution - Implemented to API spec (Uncertain if results are accurate)
    app.route('/search')
        .get(movies.search) 

    // Complete to Specification 
    app.route('/genres')
        .get(movies.genres) 

}