const { getSummary } = require("./dashboard.service");

async function summary(req, res, next) {
  try { res.json(await getSummary()); }
  catch (err) { next(err); }
}

module.exports = { summary };