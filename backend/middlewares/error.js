module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).send({
    message: statusCode === 500
      ? 'Ha ocurrido un error en el servidor'
      : err.message,
  });
};
