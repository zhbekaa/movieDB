const express = require("express");
const app = express();

const movies = require('../controller/movies.server.controllers')


module.exports = function (app) {

    // Tested - Not to API spec. (Api spec is asking for less - Do you wish for me to change it?)
    app.route('/movies')
        .get(movies.getMovies)

    // Minor Implementation - Not to API spec. (Api spec is complicated and is taking time to find a suitable SQL query to meet the requirements)
    app.route('/movies/:id')
        .get(movies.getSingleMovie)

    // not implemented
    app.route('/search')
        .get(movies.search) 

    // Complete - Returns Genres To Api Spec 
    app.route('/genres')
        .get(movies.genres) 

}