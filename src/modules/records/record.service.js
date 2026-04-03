const pool = require("../../config/db");

async function getRecords(filters) {
  const { type, category, from, to, page = 1, limit = 10 } = filters;
  const conditions = ["is_deleted = FALSE"];
  const values = [];

  if (type)     { values.push(type);     conditions.push(`type = $${values.length}`); }
  if (category) { values.push(category); conditions.push(`category = $${values.length}`); }
  if (from)     { values.push(from);     conditions.push(`date >= $${values.length}`); }
  if (to)       { values.push(to);       conditions.push(`date <= $${values.length}`); }

  const offset = (page - 1) * limit;
  values.push(limit, offset);

  const query = `
    SELECT * FROM records
    WHERE ${conditions.join(" AND ")}
    ORDER BY date DESC
    LIMIT $${values.length - 1} OFFSET $${values.length}
  `;
  const result = await pool.query(query, values);
  return result.rows;
}

async function createRecord(data) {
  const { amount, type, category, date, notes, user_id } = data;
  const result = await pool.query(
    "INSERT INTO records (amount, type, category, date, notes, user_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    [amount, type, category, date, notes, user_id]
  );
  return result.rows[0];
}

async function updateRecord(id, data) {
  const { amount, type, category, date, notes } = data;
  const result = await pool.query(
    `UPDATE records SET amount=$1, type=$2, category=$3, date=$4, notes=$5, updated_at=NOW()
     WHERE id=$6 AND is_deleted=FALSE RETURNING *`,
    [amount, type, category, date, notes, id]
  );
  if (result.rows.length === 0) throw { statusCode: 404, message: "Record not found" };
  return result.rows[0];
}

async function deleteRecord(id) {
  const result = await pool.query(
    "UPDATE records SET is_deleted=TRUE WHERE id=$1 RETURNING id",
    [id]
  );
  if (result.rows.length === 0) throw { statusCode: 404, message: "Record not found" };
  return { message: "Record deleted" };
}

module.exports = { getRecords, createRecord, updateRecord, deleteRecord };