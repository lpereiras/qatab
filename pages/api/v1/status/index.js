import database from 'infra/database.js';

async function status(req, res) {
  const db_name = process.env.POSTGRES_DB;
  // const db_name = req.query.db_name
  // that also return the database name
  // on other hand it will allow external user the
  // possibility to modify dbOpenConnections query

  const updatedAt = new Date().toISOString();
  const dbVersion = await database.query('SHOW server_version;');
  const dbMaxConnections = await database.query('SHOW max_connections;');
  const dbOpenConnections = await database.query({
    text: 'SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;',
    values: [db_name]
  });

  const version = dbVersion.rows[0].server_version;
  const maxConnections = dbMaxConnections.rows[0].max_connections;
  const activeConnections = dbOpenConnections.rows[0].count;
  
  res.status(200).json({
    status: "I'M ALIVE",
    updated_at: updatedAt,
    database: {
      db_version: version,
      db_max_connections: parseInt(maxConnections),
      db_open_connections: activeConnections,
    },
  });
}

export default status;
