const mongoose = require('mongoose');

const urlRegex = /^https?:\/\/(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]+(?:\/[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=-]*)?$/;

const cardSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value) => urlRegex.test(value),
      message: 'Debes ingresar una URL válida',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
