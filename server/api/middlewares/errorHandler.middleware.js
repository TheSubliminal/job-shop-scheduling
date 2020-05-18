module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  } else {
    const { status = 500, message = '' } = err;
    res.status(status).send({ error: message });
  }
};