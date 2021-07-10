const express = require("express");
const app = express();

const usesRouter = require('./uses/uses.router');
const urlsRouter = require('./urls/urls.router');

app.use(express.json());

app.use('/uses', usesRouter);
app.use('/urls', urlsRouter);

app.use((req, res, next) => {
  return next({ status: 404, message: `Not found: ${req.originalUrl}` });
})

app.use((err, req, res, next) => {
  console.error(err);
  const { status = 500, message = 'Something went wrong!' } = err;
  res.status(status).json({ error: message });
})

module.exports = app;
