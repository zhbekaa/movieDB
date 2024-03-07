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

   /*More testing, but no luck getting a completed query.
   Will resort to a different method on Saturday if i get enough time on the weekend.*/

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

const search = (query, done) => {

  //https://localhost/search?type=&query=
  // (Optional but will be added) type: type of the query (actor or movie or collection) shows all on default


  //methods with promises will be used.


  /* Mockup of expected Code
  if(query.type = 1){
    getActors(query.query, done => {

    })
    
  }
  else if(query.type = 2){
    getMovies(query.query, done => {

    })

  }
  else if(query.type = 3){
    getCollections(query.query, done => {

    })

  }
  else {
    getActors(query.query, done => {})
    getMovies(query.query, done => {})
    getCollections(query.query, done => {})

    results = {
      movies: movies 
      actors: actors
      collections: collections
    }
    return done(results)
  }
 */


}

const genres = (done) => {

  const sql = `SELECT id, name
  FROM genres`

  db.all(sql, [], (err, genres) =>{

    if (err){
      done(err);
    }
    else if (genres){
      done(null,genres);
    }


  })
}

module.exports = {
  getMovies: getMovies,
  getSingleMovie: getSingleMovie,
  search: search,
  genres: genres
}