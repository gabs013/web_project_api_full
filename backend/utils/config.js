const JWT_SECRET = process.env.NODE_ENV === 'production'
  ? process.env.JWT_SECRET
  : process.env.JWT_SECRET || 'clave-secreta-de-desarrollo';

module.exports = { JWT_SECRET };
