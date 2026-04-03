const pool = require("../../config/db");

async function getSummary() {
  const totals = await pool.query(`
    SELECT type, SUM(amount) as total FROM records
    WHERE is_deleted = FALSE GROUP BY type
  `);

  const categoryTotals = await pool.query(`
    SELECT category, type, SUM(amount) as total FROM records
    WHERE is_deleted = FALSE GROUP BY category, type ORDER BY total DESC
  `);

  const monthly = await pool.query(`
    SELECT TO_CHAR(date, 'YYYY-MM') as month,
      SUM(CASE WHEN type='income' THEN amount ELSE 0 END) as income,
      SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) as expense
    FROM records WHERE is_deleted = FALSE
    GROUP BY month ORDER BY month DESC LIMIT 12
  `);

  const recent = await pool.query(`
    SELECT * FROM records WHERE is_deleted = FALSE
    ORDER BY created_at DESC LIMIT 5
  `);

  const income = totals.rows.find(r => r.type === "income")?.total || 0;
  const expense = totals.rows.find(r => r.type === "expense")?.total || 0;

  return {
    total_income: income,
    total_expense: expense,
    net_balance: income - expense,
    category_breakdown: categoryTotals.rows,
    monthly_trends: monthly.rows,
    recent_activity: recent.rows,
  };
}

module.exports = { getSummary };