const path = require('path');
const winston = require('winston');
const expressWinston = require('express-winston');

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
);

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '..', 'request.log'),
    }),
  ],
  format: logFormat,
  requestWhitelist: ['method', 'path'],
  responseWhitelist: ['statusCode'],
  msg: 'Solicitud HTTP',
});

const errorFileLogger = winston.createLogger({
  format: logFormat,
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '..', 'error.log'),
    }),
  ],
});

const errorLogger = (req, res, next) => {
  res.on('finish', () => {
    if (res.statusCode >= 400) {
      errorFileLogger.error('Respuesta con error', {
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
      });
    }
  });

  next();
};

module.exports = { requestLogger, errorLogger };
