const Card = require('../models/card');

const BAD_REQUEST = 400;
const FORBIDDEN = 403;
const NOT_FOUND = 404;

module.exports.getCards = (req, res, next) => Card.find({})
  .sort({ createdAt: -1 })
  .then((cards) => res.send(cards))
  .catch(next);

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new Error('Los datos de la tarjeta no son válidos');
        error.statusCode = BAD_REQUEST;
        return next(error);
      }

      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => Card.findById(req.params.cardId)
  .orFail()
  .then((card) => {
    if (card.owner.toString() !== req.user._id) {
      const error = new Error('No tienes permiso para eliminar esta tarjeta');
      error.statusCode = FORBIDDEN;
      throw error;
    }

    return card.deleteOne().then(() => res.send(card));
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      const error = new Error('El ID de la tarjeta no es válido');
      error.statusCode = BAD_REQUEST;
      return next(error);
    }

    if (err.name === 'DocumentNotFoundError') {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = NOT_FOUND;
      return next(error);
    }

    return next(err);
  });

// Funciones que crean like y dislike
module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail()
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'CastError') {
      const error = new Error('El ID de la tarjeta no es válido');
      error.statusCode = BAD_REQUEST;
      return next(error);
    }

    if (err.name === 'DocumentNotFoundError') {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = NOT_FOUND;
      return next(error);
    }

    return next(err);
  });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail()
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'CastError') {
      const error = new Error('El ID de la tarjeta no es válido');
      error.statusCode = BAD_REQUEST;
      return next(error);
    }

    if (err.name === 'DocumentNotFoundError') {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = NOT_FOUND;
      return next(error);
    }

    return next(err);
  });
