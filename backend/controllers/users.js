const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../utils/config');

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const CONFLICT = 409;

module.exports.getUsers = (req, res, next) => User.find({})
  .then((users) => res.send(users))
  .catch(next);

module.exports.getUser = (req, res, next) => User.findById(req.params.userId)
  .orFail()
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.name === 'CastError') {
      const error = new Error('El ID del usuario no es válido');
      error.statusCode = BAD_REQUEST;
      return next(error);
    }

    if (err.name === 'DocumentNotFoundError') {
      const error = new Error('Usuario no encontrado');
      error.statusCode = NOT_FOUND;
      return next(error);
    }

    return next(err);
  });

module.exports.getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .orFail()
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.name === 'DocumentNotFoundError') {
      const error = new Error('Usuario no encontrado');
      error.statusCode = NOT_FOUND;
      return next(error);
    }

    return next(err);
  });

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (typeof password !== 'string' || password.length === 0) {
    const error = new Error('Los datos del usuario no son válidos');
    error.statusCode = BAD_REQUEST;
    return next(error);
  }

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;
      return res.status(201).send(userData);
    })
    .catch((err) => {
      if (err.code === 11000) {
        const error = new Error('Este correo electrónico ya está registrado');
        error.statusCode = CONFLICT;
        return next(error);
      }

      if (err.name === 'ValidationError') {
        const error = new Error('Los datos del usuario no son válidos');
        error.statusCode = BAD_REQUEST;
        return next(error);
      }

      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (typeof email !== 'string' || typeof password !== 'string') {
    const error = new Error('Correo electrónico o contraseña incorrectos');
    error.statusCode = UNAUTHORIZED;
    return next(error);
  }

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return null;
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => (matched ? user : null));
    })
    .then((user) => {
      if (!user) {
        const error = new Error('Correo electrónico o contraseña incorrectos');
        error.statusCode = UNAUTHORIZED;
        return next(error);
      }

      const token = jwt.sign(
        { _id: user._id.toString() },
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      return res.send({ token });
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        const error = new Error('Los datos del perfil no son válidos');
        error.statusCode = BAD_REQUEST;
        return next(error);
      }

      if (err.name === 'DocumentNotFoundError') {
        const error = new Error('Usuario no encontrado');
        error.statusCode = NOT_FOUND;
        return next(error);
      }

      return next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        const error = new Error('El avatar no es válido');
        error.statusCode = BAD_REQUEST;
        return next(error);
      }

      if (err.name === 'DocumentNotFoundError') {
        const error = new Error('Usuario no encontrado');
        error.statusCode = NOT_FOUND;
        return next(error);
      }

      return next(err);
    });
};
