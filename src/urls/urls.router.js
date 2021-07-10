const router = require('express').Router();
const usesRouter = require('../uses/uses.router')
const controller = require('./urls.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router
  .use(
    '/:urlId/uses',
    controller.urlExists,
    usesRouter
  );

router
  .route('/:urlId')
  .get(controller.read)
  .put(controller.update)
  .all(methodNotAllowed)

router
  .route('/')
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed)


module.exports = router;