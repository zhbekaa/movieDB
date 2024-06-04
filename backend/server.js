const express = require("express");
const app = express();
const port = 3000;
const sqlite3 = require("sqlite3");
const cors = require("cors");

app.use(cors());

const DBSOURCE = "movie_data.db";

let db = new sqlite3.Database(DBSOURCE);




// API endpoint
require('./app/routes/movie.server.routes')(app);
require('./app/routes/actor.server.routes')(app);

// Response for anything else
app.use((req, res) => {
    res.sendStatus(404);
});

// Root endpoint
app.get('/', (req, res, next) => {
    res.json({'server_status': 'Running'});
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// run "npm run dev" in terminal
