import database from "../../../../infra/database.js";

async function status(req, res) {
  const result = await database.query("SELECT 5+5 AS result;");

  console.log(result.rows);
  res.status(200).json({ status: "OK" });
}

export default status;
