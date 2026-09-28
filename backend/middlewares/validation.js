const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }

  return helpers.error('string.uri');
};

module.exports.validateLogin = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.validateRegistration = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateUrl),
  }),
});

module.exports.validateCard = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(validateUrl),
  }),
});

module.exports.validateProfile = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.validateAvatar = celebrate({
  [Segments.BODY]: Joi.object({
    avatar: Joi.string().required().custom(validateUrl),
  }),
});

module.exports.validateUserId = celebrate({
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
  }),
});

module.exports.validateCardId = celebrate({
  [Segments.PARAMS]: Joi.object({
    cardId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
  }),
});
