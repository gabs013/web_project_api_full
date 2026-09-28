require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error');
const { validateLogin, validateRegistration } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

const PORT = 3000;

app.use(requestLogger);
app.use(errorLogger);

app.use(express.json());

app.use(cors());

app.post('/signin', validateLogin, login);
app.post('/signup', validateRegistration, createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res, next) => {
  const error = new Error('Recurso solicitado no encontrado');
  error.statusCode = 404;
  next(error);
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
