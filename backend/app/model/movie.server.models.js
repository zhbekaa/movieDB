const sqlite3 = require("sqlite3");
const DBSOURCE = "movie_data.db";
let db = new sqlite3.Database(DBSOURCE);;



const getMovies = (query, done) => {

      if(query==null){query = ""}//load something rarther then nothing.

      //Need to add way to adjust limit. ?(later date)
      //and way to implement page? (undefined currently.)

      const sql = `
      SELECT movies.id, movies.title, movies.release_date, movies.vote_average, movies.popularity,
      (SELECT actor_name FROM "cast" WHERE movie_id = movies.id AND actor_order = 0) AS actor_name1,
      (SELECT actor_name FROM "cast" WHERE movie_id = movies.id AND actor_order = 1) AS actor_name2
      FROM movies 
      WHERE movies.id IN
        (SELECT movies.id FROM movies
        WHERE movies.title LIKE '%' || ? || '%'
        ORDER BY movies.popularity DESC
        LIMIT 20)
      ORDER BY popularity DESC;`


      db.all(sql, [query], (err, rows) => {
        if (err) {
          console.log("err:" +err)
          return done(err)

        } else if (rows){
          return done(null, rows)

        } else
        {
          console.log("unknown error")
          return done(err)
        }

      })

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


const genres = (done) => {
  const sql = `SELECT id, nameFROM genres`
    db.all(sql, [], (err, genres) =>{
      if (err){done(err)}
      else if (genres){done(null,genres)}
    })
}



const search = async (query, done) => {
  if(query.query == null){query.query = ""}//load something rarther then nothing.

  //https://localhos:3000/search?query=star
  // (Optional but will be added) type: type of the query (actor or movie or collection) shows all on default


  //Crude code. likely will clean after other apis are to spec
  if(query.type == 1){
    const movies = await searchMovies(query.query)
    const results = ({movies: movies})
    return done(null, results)
  }
  else if(query.type == 2){
    const actors = await searchActors(query.query)
    const results = ({actors: actors})
    return done(null, results)
  }
  else if(query.type == 3){
    const collections = await searchCollections(query.query)
    const results = ({collections: collections})  
    return done(null, results)
  }
  else {
    const movies = await searchMovies(query.query)
    const collections = await searchCollections(query.query)
    const actors = await searchActors(query.query)

    const results = ({
      movies: movies, 
      actors: actors,
      collections: collections
    })
    return done(null, results)
  }
}





const searchActors = (search) => {

  return new Promise((resolve, reject) => {


    //Not tested SQL fully.
     const sql = `SELECT actor_id, actor_name,
     (SELECT movies.title FROM "movies" WHERE movies.id = movie_id) AS top_movie
     FROM cast WHERE actor_name LIKE '%' || ? || '%'
     LIMIT 10`

      db.all(sql, [search], (err, actors) => {
          if (err) {
              reject(err) 
          } else {
              resolve(actors)
          }

      })



  })
}

const searchMovies = (search) => {

  return new Promise((resolve, reject) => {

      const sql = `SELECT id, title, vote_average, popularity FROM movies WHERE title LIKE '%' || ? || '%'
      LIMIT 10`

      db.all(sql, [search], (err, movies) => {
          if (err) {
              reject(err) 
          } else {
              resolve(movies)
          }

      })

  })
}

const searchCollections = (search) => {
  
  return new Promise((resolve, reject) => {

      const sql = `SELECT id, name
      FROM collections WHERE name LIKE '%' || ? || '%'
      LIMIT 10`

      db.all(sql, [search], (err, collections) => {
          if (err) {
              reject(err) 
          } else {
     
              resolve(collections)
          }

      })



  })
}

module.exports = {
  getMovies: getMovies,
  getSingleMovie: getSingleMovie,
  search: search,
  genres: genres
}