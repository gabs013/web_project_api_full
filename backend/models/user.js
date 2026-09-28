const mongoose = require('mongoose');
const validator = require('validator');

const urlRegex = /^https?:\/\/(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]+(?:\/[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=-]*)?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorador',
  },
  avatar: {
    type: String,
    default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    validate: {
      validator: (value) => urlRegex.test(value),
      message: 'Debes ingresar una URL válida',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Debes ingresar un correo electrónico válido',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
