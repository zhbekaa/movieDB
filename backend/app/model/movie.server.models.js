const sqlite3 = require("sqlite3");
const DBSOURCE = "movie_data.db";
let db = new sqlite3.Database(DBSOURCE);

const getMovies = (query, done) => {
  if (query == null) {
    query = "";
  } //load something rarther then nothing.

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
      ORDER BY popularity DESC;`;

  db.all(sql, [query], (err, rows) => {
    if (err) {
      console.log("err:" + err);
      return done(err);
    } else if (rows) {
      return done(null, rows);
    } else {
      console.log("unknown error");
      return done(err);
    }
  });
};

const getFeatured = (done) => {
  const sql = `
  SELECT
    title,
    id,
    vote_average,
    poster_path
  FROM
    movies
  ORDER BY
    popularity DESC
  LIMIT 20;
  `;

  db.all(sql, (err, rows) => {
    if (err) return done(err);

    return done(null, rows);
  });
};

const getBestRated = (done) => {
  const sql = `
  SELECT
    title,
    id,
    vote_average,
    poster_path
  FROM
    movies
  WHERE vote_count > 200
  ORDER BY
    vote_average DESC
  LIMIT 20;
  `;

  db.all(sql, (err, rows) => {
    if (err) return done(err);

    return done(null, rows);
  });
};

const getSingleMovie = (id, done) => {
  //alot more needs to be added still.

  /*More testing, but no luck getting a completed query.
   Will resort to a different method on Saturday if i get enough time on the weekend.*/

  const sql = ` 
  SELECT 
  movies.id,
  movies.title,
  movies.runtime,
  movies.poster_path,
  movies.release_date,
  movies.overview,
  movies.tagline,
  movies.homepage,
  movies.popularity,
  movies.budget,
  movies.revenue,
  movies.vote_average,
  movies.vote_count,
  movies.original_language,
  COALESCE(movies.collection_id, '') AS collection_id,
  COALESCE(collections.name, '') AS collection_name
  FROM 
    movies
  LEFT JOIN 
    collections ON movies.collection_id = collections.id
  WHERE
    movies.id = ?;`;

  db.get(sql, [id], async (err, movie) => {
    if (err) {
      console.log("err");
      console.log(err);
      done(err);
    } else if (!movie) {
      console.log("no row");
      done(err);
    } else {
      console.log("done");
      const [actors, crew, countries, genres] = await Promise.all([
        getActors(id),
        getCrew(id),
        getCountries(id),
        getGenres(id),
      ]);

      movie.actors = actors;
      movie.crew = crew;
      movie.countries = countries;
      movie.genres = genres;
      done(null, movie);
    }
  });
};

const getActors = (movieId) => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT 
    actor_id as id,
    actor_name as name,
    "character"
    FROM cast 
    WHERE movie_id = ?
    ORDER BY actor_order;
    `;

    db.all(sql, [movieId], (err, actors) => {
      if (err) {
        reject(err);
      } else if (actors) {
        resolve(actors);
      }
    });
  });
};
const getCrew = (movieId) => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT 
      member_id AS id,
      member_name AS name,
      job
    FROM 
      crew 
    WHERE 
      movie_id = ?
    ORDER BY 
      CASE 
          WHEN job = 'Director' THEN 1
          WHEN job = 'Producer' THEN 2
          WHEN job = 'Writer' THEN 3
          ELSE 4
    END;
    `;

    db.all(sql, [movieId], (err, actors) => {
      if (err) {
        reject(err);
      } else if (actors) {
        resolve(actors);
      }
    });
  });
};

const getCountries = (movieId) => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT 
      pc.name as name,
      pc.iso_3166_1 as id
    FROM 
      production_countries as pc,
      movie_production_countries as mpc
    WHERE mpc.movie_id = ? and pc.iso_3166_1 = mpc.country_code;
    `;

    db.all(sql, [movieId], (err, actors) => {
      if (err) {
        reject(err);
      } else if (actors) {
        resolve(actors);
      }
    });
  });
};
const getGenres = (movieId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
      g.id, g.name
      FROM genres g, movie_genres mg
      WHERE 
      g.id = mg.genre_id 
      AND
      mg.movie_id = ?`;

    db.all(sql, [movieId], (err, genres) => {
      if (err) reject(err);
      else if (genres) resolve(genres);
    });
  });
};


const genres = (done) => {
  const sql = `SELECT id, name FROM genres`;
  db.all(sql, [], (err, genres) => {
    if (err) {
      done(err);
    } else if (genres) {
      done(null, genres);
    }
  });
};

const search = async (query, done) => {
  if (query.query == null) {
    query.query = "";
  }

  if (query.type == 1) {
    let movies = [];
    if (query.query) {
      movies = await smallSearch(query.query);
    } else {
      movies = await searchMovies(query);
    }
    const results = { movies: movies };
    return done(null, results);
  } else if (query.type == 2) {
    const actors = await searchActors(query.query);
    const results = { actors: actors };
    return done(null, results);
  } else if (query.type == 3) {
    const collections = await searchCollections(query.query);
    const results = { collections: collections };
    return done(null, results);
  } else {
    const movies = await searchMovies(query.query);
    const collections = await searchCollections(query.query);
    const actors = await searchActors(query.query);

    const results = {
      movies: movies,
      actors: actors,
      collections: collections,
    };
    return done(null, results);
  }
};
const searchActors = (search) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT
        	c.actor_id as id,
        	c.actor_name as name,
        	m.title as top_movie,
          m.release_date as top_movie_date
        FROM
        	"cast" c,
        	movies m
        WHERE
        	m.id = c.movie_id
        	AND c.actor_name LIKE '%' || ? || '%'
        	AND c.actor_order < 5
        GROUP BY c.actor_id
        LIMIT 5;`;

    db.all(sql, [search], (err, actors) => {
      if (err) {
        reject(err);
      } else {
        resolve(actors);
      }
    });
  });
};
const smallSearch = (search) => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT id, title, release_date, vote_average, popularity
    FROM movies 
    WHERE title LIKE '%' || ? || '%'
    LIMIT 10
    `;
    db.all(sql, [search], (err, movies) => {
      if (err) {
        reject(err);
      } else {
        resolve(movies);
      }
    });
  });
};
const searchMovies = (search) => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT 
    m.id, 
    m.title, 
    m.release_date, 
    m.vote_average, 
    m.popularity 
    FROM 
        movies m
    JOIN 
        movie_genres mg ON m.id = mg.movie_id
    JOIN 
        genres g ON mg.genre_id = g.id
    WHERE 
        m.title LIKE '%' || ? || '%' 
        AND strftime('%Y', m.release_date) BETWEEN ? AND ?
        AND m.vote_average = ?
        AND g.name = ?
    LIMIT 10;`;
    params = [
      search.query,
      search.start_year,
      search.end_year,
      search.rating,
      search.genre,
    ];
    db.all(sql, params, (err, movies) => {
      if (err) {
        reject(err);
      } else {
        resolve(movies);
      }
    });
  });
};

const searchCollections = (search) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, name
      FROM collections WHERE name LIKE '%' || ? || '%'
      LIMIT 10`;

    db.all(sql, [search], (err, collections) => {
      if (err) {
        reject(err);
      } else {
        resolve(collections);
      }
    });
  });
};

module.exports = {
  getMovies: getMovies,
  getFeatured: getFeatured,
  getBestRated: getBestRated,
  getSingleMovie: getSingleMovie,
  search: search,
  genres: genres,
};
