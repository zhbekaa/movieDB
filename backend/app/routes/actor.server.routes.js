const express = require("express");
const app = express();

const actors = require('../controller/actors.server.controllers')

module.exports = function (app) {
    app.route('/actors/:id')
        .get(actors.getActor)
}
