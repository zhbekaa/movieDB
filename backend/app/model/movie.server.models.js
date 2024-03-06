const sqlite3 = require("sqlite3");
const DBSOURCE = "movie_data.db";
let db = new sqlite3.Database(DBSOURCE);;



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
          console.log("err")
          done(err);
        } else {
          console.log("done")
          console.log(JSON.stringify(rows))
          done(null, rows);
        }
      });
}

const getSingleMovie = (id, done) => {

   //alot more needs to be added still.
  const sql =` 
  SELECT 
  movies.id,
  movies.title,
  movies.runtime,
  movies.release_date,
  movies.overview,
  movies.tagline,
  movies.homepage,
  movies.popularity,
  movies.budget,
  movies.revenue,
  movies.vote_average,
  movies.vote_count,
  movies.original_language 
  FROM 
  movies
  WHERE 
  movies.id = ?`



  db.get(sql,[id], (err, row) =>{
    console.log(JSON.stringify(row))
    if (err) {
      console.log("err")
      console.log(err)
      done(err);
    } else if (!row){
      console.log("no row")
      done(err)
    }else {
      console.log("done")
      done(null,row)
    }
  })

}

const search = (query, done) => {}


module.exports = {
  getMovies: getMovies,
  getSingleMovie: getSingleMovie,
  search: search
}