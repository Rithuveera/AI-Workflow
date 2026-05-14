const sqlite3 = require('sqlite3').verbose();
const dbPath = process.env.USERPROFILE + '/.n8n/database.sqlite';
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.each("SELECT id, name, active FROM workflow_entity WHERE name LIKE '%Manual Fixed%'", (err, row) => {
        if (err) {
            console.error(err.message);
        }
        console.log(`${row.id}\t${row.active ? 'ACTIVE' : 'INACTIVE'}\t${row.name}`);
    });
});

db.close();
