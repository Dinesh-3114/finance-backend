const s = require("./record.service");

async function getRecords(req, res, next) {
  try { res.json(await s.getRecords(req.query)); }
  catch (err) { next(err); }
}
async function createRecord(req, res, next) {
  try { res.status(201).json(await s.createRecord({ ...req.body, user_id: req.user.id })); }
  catch (err) { next(err); }
}
async function updateRecord(req, res, next) {
  try { res.json(await s.updateRecord(req.params.id, req.body)); }
  catch (err) { next(err); }
}
async function deleteRecord(req, res, next) {
  try { res.json(await s.deleteRecord(req.params.id)); }
  catch (err) { next(err); }
}

module.exports = { getRecords, createRecord, updateRecord, deleteRecord };