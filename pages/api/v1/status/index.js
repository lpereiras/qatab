import database from 'infra/database.js';

async function status(req, res) {
  const updatedAt = new Date().toISOString();
  const dbMaxConnections = `SELECT * FROM pg_settings WHERE name = 'max_connections'`;
  const dbVersion = `SELECT version()`;
  const dbUsedConnections = `SELECT count(*) FROM pg_stat_activity`;

  const maxConnections = await database.query(dbMaxConnections);
  const version = await database.query(dbVersion);
  const activeConnections = await database.query(dbUsedConnections);

  res.status(200).json({
    status: `I'M ALIVE`,
    updated_at: updatedAt,
    database: {
      db_version: version.rows[0].version,
      db_max_connections: maxConnections.rows[0].setting,
      db_used_connections: activeConnections.rows[0].count,
    },
  });
}

export default status;
