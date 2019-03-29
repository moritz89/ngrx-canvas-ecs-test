var sqlite3 = require('sqlite3').verbose();

const DBSOURCE = 'db.sqlite';

let db = new sqlite3.Database(DBSOURCE, err => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
    db.run(
      `CREATE TABLE pumps (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
        )`,
      err => {
        if (err) {
          console.log(err);
        } else {
          // Table just created, creating some rows
          const insert = 'INSERT INTO pumps (name) VALUES ?';
          db.run(insert, ['main pump']);
          db.run(insert, ['secondary pump']);
        }
      }
    );
    console.log('Created pumps table');
    db.run(
      `CREATE TABLE canvas_aspects (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          item INTEGER,
          type TEXT,
          top REAL,
          left REAL,
          width REAL,
          height REAL,
          url TEXT,
          stroke_width INTEGER,
          fill TEXT,
          FOREIGN KEY(item) REFERENCES pumps(id)
      )`,
      err => {
        if (err) {
          console.log(err);
          // Table already created
        } else {
          // Table just created, creating some rows
          const insert =
            'INSERT INTO canvas_aspects (item, type, top, left, width, height, url, stroke_width, fill)';
          const selectPumpId = 'SELECT id, name FROM pumps WHERE name = ?';
          pumpId = db.get(selectPumpId, ['main pump'], (err, row) => {
            if (err) {
              return console.error(err.message);
            } else {
              return row
                ? row.id
                : console.log(`No pump with the name: ${name}`);
            }
          });
          db.run(insert, [
            pumpId,
            'Rectangle',
            100,
            150,
            20,
            30,
            null,
            0,
            'green'
          ]);
        }
      }
    );
  }
});

module.exports = db;
