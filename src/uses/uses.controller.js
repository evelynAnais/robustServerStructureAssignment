const uses = require('../data/uses-data');

//middleware
function useExists (req, res, next) {
  const { useId } = req.params;
  const foundUse = uses.find((use) => use.id === Number(useId));

  if (foundUse === undefined) {
    return next({
      status: 404,
      message: `Count useId not found: ${useId}`
    });
  } 
  res.locals.use = foundUse;
  next();
};

function list (req, res) {
  res.json({ data: uses });
}

function read (req, res, next) {
  res.json({ 
    data: res.locals.use
  });
};

function destroy(req, res) {
  const { useId } = req.params;
  const index = uses.findIndex((use) => use.id === Number(useId));
  if (index > -1) {
    uses.splice(index, 1);
  }
  res.sendStatus(204);
}

module.exports = {
  list,
  read: [ useExists, read ],
  delete: [ useExists, destroy ], 
};