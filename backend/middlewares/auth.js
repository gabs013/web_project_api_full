const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({
      message: 'Se requiere autorización',
    });
  }

  const token = authorization.slice(7);

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).send({
      message: 'Se requiere autorización',
    });
  }
};
