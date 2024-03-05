const express = require("express");
const app = express();
const port = 3000;
const sqlite3 = require("sqlite3");
const cors = require("cors");

app.use(cors());
const DBSOURCE = "movie_data.db";

let db = new sqlite3.Database(DBSOURCE);
// Example route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/movies", (req, res) => {
  const search = req.query.search;
  const sql = `
  SELECT
	movies.id,
	movies.title,
	movies.release_date,
	movies.vote_average,
	movies.popularity,
	(SELECT actor_name FROM "cast" WHERE movie_id = movies.id AND actor_order = 0) AS actor_name1,
	(SELECT actor_name FROM "cast" WHERE movie_id = movies.id AND actor_order = 1) AS actor_name2
	FROM movies WHERE movies.id IN(
		SELECT
			movies.id FROM movies
			WHERE
				movies.title LIKE '%' || ? || '%'
			ORDER BY
				movies.popularity DESC
			LIMIT 10)
	ORDER BY popularity DESC;
  
  
  `;
  db.all(sql, [search], (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

// app.get("/movies", (req, res) => {
//   const search = req.query.search;
//   const sql = `SELECT movies.id, movies.title, movies.release_date, movies.vote_average, movies.popularity FROM movies WHERE movies.title LIKE '%' || ? || '%'
//   ORDER BY movies.popularity DESC
//   LIMIT 10
//   `;
//   db.all(sql, [search], (err, rows) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(rows);
//     }
//   });
// });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// run "npm run dev" in terminal
