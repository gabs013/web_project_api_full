const express = require('express');

const {
  getUsers,
  getCurrentUser,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');
const {
  validateProfile,
  validateAvatar,
  validateUserId,
} = require('../middlewares/validation');

const router = express.Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateUserId, getUser);
router.patch('/me', validateProfile, updateProfile);
router.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
