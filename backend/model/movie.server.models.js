const DBSOURCE = "movie_data.db";
let db = new sqlite3.Database(DBSOURCE);

const getMovies = (query, done) => {

    const sql = `
      SELECT movies.id, movies.title, movies.release_date, movies.vote_average, movies.popularity,
      (SELECT actor_name FROM "cast" WHERE movie_id = movies.id AND actor_order = 0) AS actor_name1,
      (SELECT actor_name FROM "cast" WHERE movie_id = movies.id AND actor_order = 1) AS actor_name2
      FROM movies 
      WHERE movies.id IN
        (SELECT movies.id FROM movies
        WHERE movies.title LIKE '%' || ? || '%'
        ORDER BY movies.popularity DESC
        LIMIT 10)
      ORDER BY popularity DESC;`

      db.all(sql, [query], (err, rows) => {
        if (err) {
          done.send(err);
        } else {
          done.send(rows);
        }
      });
}

const getSingleMovie = (id, done) => {}

const search = (query, done) => {}