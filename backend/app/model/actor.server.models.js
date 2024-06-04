const sqlite3 = require("sqlite3");
const DBSOURCE = "movie_data.db";
let db = new sqlite3.Database(DBSOURCE);

const getSingleActor = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT c."character", c.cast_id, c.movie_id, m.title, m.poster_path,
    m.vote_average
    from cast c, movies m
    where m.id = c.movie_id
    and c.actor_id = ?
    
    order by c.actor_order
    `;
    db.all(sql, [id], (err, actor) => {
      if (err) {
        reject(err);
      } else {
        resolve(actor);
      }
    });
  });
};
module.exports = {
  getSingleActor: getSingleActor,
};
