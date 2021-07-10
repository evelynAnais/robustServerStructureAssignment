const urls = require('../data/urls-data');
const uses = require('../data/uses-data');
  // middleware
function hasText(req, res, next) {
  const { data: { href } = {} } = req.body;

  if (href) {
    return next();
  }
  next({ status: 400, message: "A 'href' property is required." });
}

  // middleware
function urlExists(req, res, next) {
  const urlId = Number(req.params.urlId);
  const foundUrl = urls.find((note) => note.id === urlId);
  if (foundUrl) {
    return next();
  }
  next({
    status: 404,
    message: `Url id not found: ${req.params.urlId}`,
  });
}
function list(req, res) {
  res.json({ data: urls });
}

function create(req, res) {
  const { data: { href } = {} } = req.body;
  const newUrl = {
    id: urls.length + 1,
    href,
  };
  urls.push(newUrl);
  res.status(201).json({ data: newUrl });
}

function read(req, res) {
  const urlId = Number(req.params.urlId);
  const foundUrl = urls.find((note) => (note.id === urlId));
  const newUse = {
    id: uses.length ++,
    urlId: urlId,
    time: Date.now(),
  }
  uses.unshift(newUse);
  res.json({ data: foundUrl });
}

function update(req, res) {
  const urlId = Number(req.params.urlId);
  const foundUrl = urls.find((note) => note.id === urlId);

  const { data: { href } = {} } = req.body;

  foundUrl.href = href;

  res.json({ data: foundUrl });
}

module.exports = {
  create: [hasText, create],
  list,
  read: [urlExists, read],
  update: [urlExists, hasText, update],
  urlExists,
};